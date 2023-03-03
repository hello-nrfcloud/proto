import ts from 'typescript'
import { addDocBlock } from './addDocBlock'
import { customTypeName, typeName } from './Direction'
import {
	ArraySchema,
	Direction,
	EnumSchema,
	isArraySchema,
	isEnumSchema,
	isObjectSchema,
	isRef,
	isUnionTypeSchema,
	JSONSchemaType,
	NRFCloudApplicationSchema,
	ObjectSchema,
	RefSchema,
} from './NRFCloudApplicationSchema'

export const createTypeFromSchema = (
	file: string,
	$id: URL,
	schema: NRFCloudApplicationSchema,
): { typeName: string; tree: ts.Node[]; direction: Direction } => {
	const direction = file.includes('deviceToCloud')
		? 'deviceToCloud'
		: 'cloudToDevice'

	const name =
		'properties' in schema ? typeName(schema) : customTypeName(schema)
	if (name === null) throw new Error(`Could not create name for schema`)

	const tree: ts.Node[] = []

	const objectTypeExport = ts.factory.createTypeAliasDeclaration(
		[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createIdentifier(name),
		undefined,
		ts.factory.createTypeReferenceNode('Readonly', [
			createType(tree, file, name, schema, schema),
		]),
	)

	addDocBlock([
		schema.description,
		``,
		`Direction: ${direction}`,
		``,
		`@see ${$id.toString()}`,
	])(objectTypeExport)

	tree.push(objectTypeExport)

	return {
		typeName: name,
		tree,
		direction,
	}
}

const createObjectType = (
	tree: ts.Node[],
	file: string,
	schema: ObjectSchema,
	root: NRFCloudApplicationSchema,
): ts.TypeNode => {
	const objectMembers: ts.TypeNode[] = []
	const { properties, required } = schema
	for (const [id, property] of Object.entries(properties)) {
		objectMembers.push(createType(tree, file, id, property, root))
	}

	return ts.factory.createTypeLiteralNode(
		Object.entries(properties).map(([id, property]) => {
			ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(id))
			if (isRef(property)) {
				property = resolveRef(property, root)
			}
			return addDocBlock(property.description)(
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createStringLiteral(id),
					required?.includes(id) ?? false
						? undefined
						: ts.factory.createToken(ts.SyntaxKind.QuestionToken),
					createType(tree, file, id, property, root),
				),
			)
		}),
	)
}

const createType = (
	tree: ts.Node[],
	file: string,
	id: string,
	property: JSONSchemaType,
	root: NRFCloudApplicationSchema,
): ts.TypeNode => {
	if (isEnumSchema(property)) {
		return createEnumType(tree, file, id, property)
	}
	if (isArraySchema(property)) {
		return createArrayType(tree, file, id, property, root)
	}
	if (isUnionTypeSchema(property)) {
		const variants: ts.TypeNode[] = []
		const { oneOf, ...rest } = property
		for (const schema of oneOf) {
			variants.push(createType(tree, file, id, { ...rest, ...schema }, root))
		}
		return ts.factory.createUnionTypeNode(variants)
	}
	if (isObjectSchema(property)) {
		return createObjectType(tree, file, property, root)
	}
	if (isRef(property)) {
		return createType(tree, file, id, resolveRef(property, root), root)
	}
	switch (property.type) {
		case 'string':
			if (property.const !== undefined) {
				return ts.factory.createLiteralTypeNode(
					ts.factory.createStringLiteral(property.const),
				)
			}
			return ts.factory.createTypeReferenceNode(
				ts.factory.createIdentifier('string'),
			)
		case 'integer':
		case 'number':
			return ts.factory.createTypeReferenceNode(
				ts.factory.createIdentifier('number'),
			)
		case 'boolean':
			return ts.factory.createTypeReferenceNode(
				ts.factory.createIdentifier('boolean'),
			)
		default:
			console.error(property)
			throw new Error(`Unknown schema!`)
	}
}

const enumsPerFile: Record<string, string[]> = {}

const createEnumType = (
	tree: ts.Node[],
	file: string,
	id: string,
	property: EnumSchema,
): ts.TypeNode => {
	if (enumsPerFile[file] === undefined) enumsPerFile[file] = []
	if (!(enumsPerFile[file]?.includes(id) ?? false)) {
		tree.push(
			ts.factory.createEnumDeclaration(
				[ts.factory.createToken(ts.SyntaxKind.DeclareKeyword)],
				ts.factory.createIdentifier(id),
				property.enum.map((e) => {
					let key = e
					let value = e
					if (typeof key === 'number') {
						key = `n_${key}`
						value = value.toString()
					}
					return ts.factory.createEnumMember(
						key,
						ts.factory.createStringLiteral(value),
					)
				}),
			),
		)
		enumsPerFile[file]?.push(id)
	}

	return ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(id))
}

const arrayTypesPerFile: Record<string, string[]> = {}

const createArrayType = (
	tree: ts.Node[],
	file: string,
	id: string,
	property: ArraySchema,
	root: NRFCloudApplicationSchema,
): ts.TypeNode => {
	if (arrayTypesPerFile[file] === undefined) arrayTypesPerFile[file] = []
	if (!(arrayTypesPerFile[file]?.includes(id) ?? false)) {
		tree.push(
			ts.factory.createTypeAliasDeclaration(
				undefined,
				ts.factory.createIdentifier(`${id}Item`),
				undefined,
				ts.factory.createTypeReferenceNode('Readonly', [
					createType(tree, file, id, property.items, root),
				]),
			),
		)
		arrayTypesPerFile[file]?.push(id)
	}

	return ts.factory.createArrayTypeNode(
		ts.factory.createTypeReferenceNode(`${id}Item`),
	)
}

const resolveRef = (
	schema: RefSchema,
	root: NRFCloudApplicationSchema,
): JSONSchemaType => {
	const id = schema.$ref.split('/').pop() ?? ''
	const replacement = root.definitions?.[id]
	if (replacement === undefined)
		throw new Error(`Could not resolved $ref: ${schema.$ref}!`)
	return replacement as JSONSchemaType
}

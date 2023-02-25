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
	isUnionTypeSchema,
	JSONSchemaType,
	NRFCloudApplicationSchema,
	ObjectSchema,
} from './NRFCloudApplicationSchema'

export const createTypeFromSchema = (
	file: string,
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
			createType(tree, name, schema),
		]),
	)

	addDocBlock([
		schema.description,
		``,
		`Direction: ${direction}`,
		``,
		`@see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/${file}`,
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
	id: string,
	schema: ObjectSchema,
): ts.TypeNode => {
	const objectMembers: ts.TypeNode[] = []
	const { properties, required } = schema
	for (const [id, property] of Object.entries(properties)) {
		objectMembers.push(createType(tree, id, property))
	}

	return ts.factory.createTypeLiteralNode(
		Object.entries(properties).map(([id, property]) => {
			ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(id))
			return addDocBlock(property.description)(
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createStringLiteral(id),
					required
						? undefined
						: ts.factory.createToken(ts.SyntaxKind.QuestionToken),
					createType(tree, id, property),
				),
			)
		}),
	)
}

const createType = (
	tree: ts.Node[],
	id: string,
	property: JSONSchemaType,
): ts.TypeNode => {
	if (isEnumSchema(property)) {
		return createEnumType(tree, id, property)
	}
	if (isArraySchema(property)) {
		return createArrayType(tree, id, property)
	}
	if (isUnionTypeSchema(property)) {
		const variants: ts.TypeNode[] = []
		const { oneOf, ...rest } = property
		for (const schema of oneOf) {
			variants.push(createType(tree, id, { ...rest, ...schema }))
		}
		return ts.factory.createUnionTypeNode(variants)
	}
	if (isObjectSchema(property)) {
		return createObjectType(tree, id, property)
	}
	switch (property.type) {
		case 'string':
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

const createEnumType = (
	tree: ts.Node[],
	id: string,
	property: EnumSchema,
): ts.TypeNode => {
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
	return ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(id))
}

const createArrayType = (
	tree: ts.Node[],
	id: string,
	property: ArraySchema,
): ts.TypeNode =>
	ts.factory.createTypeReferenceNode('Array', [
		createType(tree, id, property.items),
	])

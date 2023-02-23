import ts from 'typescript'
import { addDocBlock } from './addDocBlock'
import {
	ArrayProperty,
	isArrayPropertySchema,
	isObjectSchema,
	NRFCloudApplicationSchema,
	ObjectPropertiesSchema,
	ObjectProperty,
} from './NRFCloudApplicationSchema'

const customTypeName = (schema: { title: string }): string | null => {
	if (schema.title === 'GNSS') return 'GNSS'
	return schema.title
}
export type Direction = 'deviceToCloud' | 'cloudToDevice'

const typeName = (schema: {
	title: string
	properties: { appId: { const?: string } }
}): string | null => schema.properties?.appId?.const ?? customTypeName(schema)

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

	createObjectTypeFromSchema(tree, name, direction, schema, file)

	return {
		typeName: name,
		tree,
		direction,
	}
}

const createObjectTypeFromSchema = (
	tree: ts.Node[],
	name: string,
	direction: Direction,
	schema: NRFCloudApplicationSchema,
	file: string,
) => {
	const objectTypeExport = ts.factory.createTypeAliasDeclaration(
		[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createIdentifier(name),
		undefined,
		ts.factory.createTypeReferenceNode('Readonly', [
			createObjectType(tree, schema),
		]),
	)

	addDocBlock(
		[
			schema.description,
			``,
			`Direction: ${direction}`,
			``,
			`@see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/${file}`,
		],
		objectTypeExport,
	)

	tree.push(objectTypeExport)
}

const createObjectType = (
	tree: ts.Node[],
	schema: ObjectPropertiesSchema,
): ts.TypeNode => {
	const objectMembers: ts.TypeElement[] = []
	const { properties, required } = schema
	for (const [id, property] of Object.entries(properties)) {
		if ('enum' in property) {
			tree.push(
				ts.factory.createEnumDeclaration(
					[ts.factory.createToken(ts.SyntaxKind.DeclareKeyword)],
					ts.factory.createIdentifier(id),
					property.enum.map((e) =>
						ts.factory.createEnumMember(e, ts.factory.createStringLiteral(e)),
					),
				),
			)
			objectMembers.push(
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createStringLiteral(id),
					required?.includes(id) ?? false
						? undefined
						: ts.factory.createToken(ts.SyntaxKind.QuestionToken),
					ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(id)),
				),
			)
			continue
		}
		objectMembers.push(
			ts.factory.createPropertySignature(
				undefined,
				ts.factory.createStringLiteral(id),
				required?.includes(id) ?? false
					? undefined
					: ts.factory.createToken(ts.SyntaxKind.QuestionToken),
				createPropertyType(tree, property),
			),
		)
	}

	return ts.factory.createTypeLiteralNode(objectMembers)
}

const createPropertyType = (
	tree: ts.Node[],
	property: ObjectProperty | ArrayProperty,
) =>
	isObjectSchema(property)
		? createObjectType(tree, property)
		: isArrayPropertySchema(property)
		? createArrayType(tree, property)
		: createTypeScriptTypeFromSchemaType(property)

const createArrayType = (
	tree: ts.Node[],
	property: ArrayProperty,
): ts.TypeNode =>
	ts.factory.createTypeReferenceNode('Array', [
		createPropertyType(tree, property.items),
	])

const createTypeScriptTypeFromSchemaType = (
	schema: ObjectProperty,
): ts.TypeNode => {
	if (!('type' in schema)) {
		console.error(schema)
		throw new Error(`Unknown schema: ${schema}!`)
	}

	switch (schema.type) {
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
			console.error(schema)
			throw new Error(`Unknown schema type: ${schema.type}!`)
	}
}

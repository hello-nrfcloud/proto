import ts from 'typescript'
import { addDocBlock } from './addDocBlock'
import {
	isObjectSchema,
	NRFCloudApplicationSchema,
	ObjectPropertiesSchema,
	ObjectProperty,
} from './NRFCloudApplicationSchema'

const customTypeName = (schema: NRFCloudApplicationSchema): string | null => {
	if (schema.title === 'GNSS') return 'GNSS'
	return schema.title
}
export type Direction = 'deviceToCloud' | 'cloudToDevice'
const typeName = (schema: NRFCloudApplicationSchema): string | null =>
	schema.properties?.appId.const ?? customTypeName(schema)
export const createTypeFromSchema = (
	file: string,
	schema: NRFCloudApplicationSchema,
): { typeName: string; tree: ts.Node[]; direction: Direction } => {
	const direction = file.includes('deviceToCloud')
		? 'deviceToCloud'
		: 'cloudToDevice'

	const name = typeName(schema)
	if (name === null) throw new Error(`Could not create name for schema`)

	const objectTypeExport = ts.factory.createTypeAliasDeclaration(
		[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
		ts.factory.createIdentifier(name),
		undefined,
		ts.factory.createTypeReferenceNode('Readonly', [
			createObjectTypeFromSchema(schema),
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

	return {
		typeName: name,
		tree: [objectTypeExport],
		direction,
	}
}

const createObjectTypeFromSchema = (
	schema: NRFCloudApplicationSchema,
): ts.TypeNode => {
	if (isObjectSchema(schema)) return createObjectTypeFromProperties(schema)
	return ts.factory.createTypeReferenceNode('Record', [
		ts.factory.createTypeReferenceNode('string'),
		ts.factory.createTypeReferenceNode('any'),
	])
}

const createObjectTypeFromProperties = ({
	properties,
	required,
}: ObjectPropertiesSchema): ts.TypeNode => {
	let type: ts.TypeNode = ts.factory.createTypeLiteralNode(
		Object.entries(properties).map(([id, property]) => {
			const p = ts.factory.createPropertySignature(
				undefined,
				ts.factory.createStringLiteral(id),
				required?.includes(id) ?? false
					? undefined
					: ts.factory.createToken(ts.SyntaxKind.QuestionToken),
				isObjectSchema(property)
					? createObjectTypeFromProperties(property)
					: createTypeScriptTypeFromSchemaType(property),
			)
			return p
		}),
	)

	return type
}

const createTypeScriptTypeFromSchemaType = (
	schema: ObjectProperty,
): ts.TypeNode => {
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
		case 'enum':
			return ts.factory.createEnumDeclaration(
				undefined,
				ts.factory.createIdentifier(schema.name),
				schema.enum.map((e) => ts.factory.createEnumMember(e)),
			)
		default:
			console.error(schema)
			throw new Error(`Unknown schema type: ${schema.type}!`)
	}
}

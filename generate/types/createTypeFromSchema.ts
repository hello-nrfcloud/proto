import ts from 'typescript'
import { addDocBlock } from './addDocBlock'
import type { NRFCloudApplicationSchema } from './NRFCloudApplicationSchema'

const customTypeName = (schema: NRFCloudApplicationSchema): string | null => {
	if (schema.title === 'GNSS') return 'GNSS'
	return schema.title
}
type Direction = 'deviceToCloud' | 'cloudToDevice'
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
			ts.factory.createTypeReferenceNode('Record', [
				ts.factory.createTypeReferenceNode('string'),
				ts.factory.createTypeReferenceNode('any'),
			]),
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

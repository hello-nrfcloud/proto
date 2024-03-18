import ts from 'typescript'
import type { generateExports } from './generateExports.js'

export const createUnionType = (
	exports: Parameters<typeof generateExports>[0] = [],
): ts.Node[] => {
	const tree: ts.Node[] = []

	for (const { name } of exports) {
		tree.push(
			ts.factory.createImportDeclaration(
				undefined,
				ts.factory.createImportClause(
					true,
					undefined,
					ts.factory.createNamedImports([
						ts.factory.createImportSpecifier(
							false,
							undefined,
							ts.factory.createIdentifier(name),
						),
					]),
				),
				ts.factory.createStringLiteral(`./generated/${name}`),
			),
		)
	}

	tree.push(
		ts.factory.createTypeAliasDeclaration(
			[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
			ts.factory.createIdentifier('NRFCloudMessage'),
			undefined,
			ts.factory.createTypeReferenceNode('Readonly', [
				ts.factory.createUnionTypeNode(
					exports.map(({ name }) => ts.factory.createTypeReferenceNode(name)),
				),
			]),
		),
	)
	return tree
}

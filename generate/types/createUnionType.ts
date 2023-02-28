import ts from 'typescript'
import { generateExports, toTypeName } from './generateExports'

export const createUnionType = (
	exports: Parameters<typeof generateExports>[0] = [],
): ts.Node[] => {
	const tree: ts.Node[] = []

	for (const { name, direction } of exports) {
		tree.push(
			ts.factory.createImportDeclaration(
				undefined,
				ts.factory.createImportClause(
					true,
					undefined,
					ts.factory.createNamedImports([
						ts.factory.createImportSpecifier(
							false,
							ts.factory.createIdentifier(name),
							ts.factory.createIdentifier(toTypeName({ name, direction })),
						),
					]),
				),
				ts.factory.createStringLiteral(`./${direction}/${name}`),
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
					exports.map(({ name, direction }) =>
						ts.factory.createTypeReferenceNode(toTypeName({ direction, name })),
					),
				),
			]),
		),
	)
	return tree
}

import ts from 'typescript'

/**
 * This generates the TypeScript source that exports all the individual types.
 */
export const generateExports = (types: { name: string }[]): ts.Node[] => {
	const exportDefinitions: ts.Node[] = []
	for (const { name } of types.sort(({ name: n1 }, { name: n2 }) =>
		n1.localeCompare(n2),
	)) {
		exportDefinitions.push(
			ts.factory.createExportDeclaration(
				undefined,
				true,
				ts.factory.createNamedExports([
					ts.factory.createExportSpecifier(
						false,
						undefined,
						ts.factory.createIdentifier(name),
					),
				]),
				ts.factory.createStringLiteral(`./${name}`),
			),
		)
	}
	exportDefinitions.push(
		ts.factory.createExportDeclaration(
			undefined,
			true,
			ts.factory.createNamedExports([
				ts.factory.createExportSpecifier(
					false,
					undefined,
					ts.factory.createIdentifier('NRFCloudMessage'),
				),
			]),
			ts.factory.createStringLiteral(`./NRFCloudMessage`),
		),
	)
	return exportDefinitions
}

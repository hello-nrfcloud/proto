import ts from 'typescript'
import type { Direction } from './NRFCloudApplicationSchema'

/**
 * This generates the TypeScript source that exports all the individual types.
 */
export const generateExports = (
	types: { direction: Direction; name: string }[],
): ts.Node[] => {
	const exportDefinitions: ts.Node[] = []
	for (const { name, direction } of types.sort(({ name: n1 }, { name: n2 }) =>
		n1.localeCompare(n2),
	)) {
		exportDefinitions.push(
			ts.factory.createExportDeclaration(
				undefined,
				true,
				ts.factory.createNamedExports([
					ts.factory.createExportSpecifier(
						false,
						ts.factory.createIdentifier(name),
						ts.factory.createIdentifier(toTypeName({ name, direction })),
					),
				]),
				ts.factory.createStringLiteral(`./${direction}/${name}`),
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

export const toTypeName = ({
	name,
	direction,
}: {
	direction: Direction
	name: string
}): string => `${name}_${direction === 'cloudToDevice' ? 'C2D' : 'D2C'}`

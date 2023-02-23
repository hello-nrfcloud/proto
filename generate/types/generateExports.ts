import ts from 'typescript'
import type { Direction } from './createTypeFromSchema'

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
						ts.factory.createIdentifier(
							`${name}_${direction === 'cloudToDevice' ? 'C2D' : 'D2C'}`,
						),
					),
				]),
				ts.factory.createStringLiteral(`./${direction}/${name}`),
			),
		)
	}
	return exportDefinitions
}

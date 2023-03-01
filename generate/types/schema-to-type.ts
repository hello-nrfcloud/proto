import chalk from 'chalk'
import { readFileSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { messages } from '../../messages'
import { createTypeFromSchema } from './createTypeFromSchema'
import { createUnionType } from './createUnionType'
import { generateExports } from './generateExports'
import { isSchema } from './NRFCloudApplicationSchema'
import { printNode } from './printNode'
import { resolveSchemaRefererences } from './resolveSchemaRefererences'

const exports: Parameters<typeof generateExports>[0] = []

for (const { path: file, $id } of messages) {
	const schema = JSON.parse(readFileSync(file, 'utf-8'))
	if (!isSchema(schema)) {
		console.debug(chalk.gray(`Ignoring`), chalk.blue.dim(file))
		continue
	}
	console.debug(chalk.green.dim(`Parsing`), chalk.blue(file))

	const { typeName, tree, direction } = createTypeFromSchema(
		file,
		$id,
		resolveSchemaRefererences(schema),
	)
	const typeFile = path.join(
		process.cwd(),
		'types',
		direction,
		`${typeName}.ts`,
	)
	writeFileSync(typeFile, tree.map(printNode).join(os.EOL), 'utf-8')
	console.log(chalk.green('Writing'), chalk.blue(typeFile))
	exports.push({ name: typeName, direction })
}

// Union
const NRFCloudMessageFile = path.join(
	process.cwd(),
	'types',
	`NRFCloudMessage.ts`,
)
writeFileSync(
	NRFCloudMessageFile,
	createUnionType(exports).map(printNode).join(os.EOL),
	'utf-8',
)
console.log(chalk.green('Writing'), chalk.blue(NRFCloudMessageFile))

// Export
const exportsFiles = path.join(process.cwd(), 'types', 'types.ts')
console.log(chalk.green('Writing'), chalk.blue(exportsFiles))
writeFileSync(
	exportsFiles,
	generateExports(exports).map(printNode).join(os.EOL),
	'utf-8',
)

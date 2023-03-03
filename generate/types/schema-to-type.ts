import chalk from 'chalk'
import { writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { messages } from '../../messages'
import { createTypeFromSchema } from './createTypeFromSchema'
import { createUnionType } from './createUnionType'
import { generateExports } from './generateExports'
import { printNode } from './printNode'

const exports: Parameters<typeof generateExports>[0] = []

for (const { schema, $id, direction, name } of messages) {
	console.debug(chalk.green.dim(`Parsing`), chalk.blue($id))

	const { typeName, tree } = createTypeFromSchema(direction, name, $id, schema)
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

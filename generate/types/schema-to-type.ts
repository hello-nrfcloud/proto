import chalk from 'chalk'
import { writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { ipShadowMessage, messages } from '../schema/messages.js'
import { createTypeFromSchema } from './createTypeFromSchema.js'
import { createUnionType } from './createUnionType.js'
import { generateExports } from './generateExports.js'
import { printNode } from './printNode.js'

const writeType = ({
	schema,
	$id,
	name,
}: {
	$id: URL
	schema: any
	name: string
}) => {
	console.debug(chalk.green.dim(`Parsing`), chalk.blue($id))

	const { typeName, tree } = createTypeFromSchema(name, $id, schema)
	const typeFile = path.join(
		process.cwd(),
		'nrfCloud',
		'types',
		'generated',
		`${typeName}.ts`,
	)
	writeFileSync(typeFile, tree.map(printNode).join(os.EOL), 'utf-8')
	console.log(chalk.green('Writing'), chalk.blue(typeFile))
}

const exports: Parameters<typeof generateExports>[0] = []

for (const type of [...messages, ipShadowMessage]) {
	writeType(type)
	exports.push({ name: type.name })
}

// Union
const NRFCloudMessageFile = path.join(
	process.cwd(),
	'nrfCloud',
	'types',
	`NRFCloudMessage.ts`,
)
writeFileSync(
	NRFCloudMessageFile,
	createUnionType(messages).map(printNode).join(os.EOL),
	'utf-8',
)
console.log(chalk.green('Writing'), chalk.blue(NRFCloudMessageFile))

// Export
const exportsFiles = path.join(process.cwd(), 'nrfCloud', 'types', 'types.ts')
console.log(chalk.green('Writing'), chalk.blue(exportsFiles))
writeFileSync(
	exportsFiles,
	generateExports(exports).map(printNode).join(os.EOL),
	'utf-8',
)

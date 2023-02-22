import chalk from 'chalk'
import glob from 'glob'
import { readFileSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createTypeFromSchema } from './createTypeFromSchema'
import { isSchema } from './NRFCloudApplicationSchema'
import { printNode } from './printNode'

const schemasDir = path.join(
	process.cwd(),
	'nrfcloud-application-protocols',
	'schemas',
)

for (const file of glob.sync('{cloudToDevice,deviceToCloud}/*/*.json', {
	cwd: schemasDir,
})) {
	const schema = JSON.parse(readFileSync(path.join(schemasDir, file), 'utf-8'))
	if (!isSchema(schema)) {
		console.debug(chalk.gray(`Ignoring`), chalk.blue.dim(file))
		continue
	}
	console.debug(chalk.green.dim(`Parsing`), chalk.blue(file))

	const { typeName, tree, direction } = createTypeFromSchema(file, schema)
	const typeFile = path.join(
		process.cwd(),
		'types',
		direction,
		`${typeName}.d.ts`,
	)
	writeFileSync(typeFile, tree.map(printNode).join(os.EOL), 'utf-8')
	console.log(chalk.green('Writing'), chalk.blue(typeFile))
}

import chalk from 'chalk'
import { writeFileSync } from 'fs'
import path from 'node:path/posix'
import { SOLAR } from '../../nrfCloud/types/solarThingy/SOLAR.js'
import { VOLTAGE } from '../../nrfCloud/types/solarThingy/VOLTAGE.js'
import { ipShadowMessage, messages } from './messages.js'
const outfile = path.join(
	process.cwd(),
	'schemas',
	'NRFCloudMessage.schema.json',
)

console.log(chalk.green('Writing'), chalk.blue(outfile))

writeFileSync(
	outfile,
	JSON.stringify(
		{
			$schema: 'http://json-schema.org/draft-07/schema#',
			$id: 'https://github.com/bifravst/nRF-Guide-proto/blob/saga/schemas/NRFCloudMessage.schema.json',
			title: 'Schema for messages received from the nRF Cloud MQTT bridge',
			oneOf: [
				...messages.map(({ $id }) => ({
					$ref: $id.toString(),
				})),
				{
					$ref: ipShadowMessage.$id.toString(),
				},
				{
					$ref: SOLAR.$id.toString(),
				},
				{
					$ref: VOLTAGE.$id.toString(),
				},
			],
		},
		null,
		2,
	),
	'utf-8',
)

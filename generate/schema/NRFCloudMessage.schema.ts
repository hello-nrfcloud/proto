import chalk from 'chalk'
import { writeFileSync } from 'fs'
import path from 'node:path/posix'
import { messages } from '../../messages'
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
			$id: 'https://github.com/bifravst/nRF.guide-proto/blob/saga/schemas/NRFCloudMessage.schema.json',
			title: 'Envelope schema for nRF Cloud application messages',
			description:
				'All messages received from nRF Cloud via MQTT are wrapped in this envelope',
			type: 'object',
			properties: {
				sender: {
					type: 'string',
					minLength: 1,
				},
				topic: {
					type: 'string',
					minLength: 1,
				},
				payload: {
					oneOf: messages.map(({ $id }) => ({
						$ref: $id.toString(),
					})),
				},
			},
			required: ['sender', 'topic', 'payload'],
		},
		null,
		2,
	),
	'utf-8',
)

import { Type, type Static } from '@sinclair/typebox'
import { messageType, ts } from '../nrfCloud/NRFCloud.js'

export const VOLTAGE = {
	$id: new URL(
		`https://raw.githubusercontent.com/bifravst/Muninn-proto/types/VOLTAGE.ts`,
	),
	schema: Type.Object(
		{
			appId: Type.Literal('VOLTAGE'),
			messageType,
			ts,
			data: Type.RegEx(/^[0-9]+$/, {
				examples: ['4085'],
				description: 'Battery voltage in mV encoded as string',
			}),
		},
		{
			title: 'Voltage',
			description: 'Battery in mV from the solar shield',
		},
	),
	name: 'VOLTAGE',
}

export type TYPE = Readonly<Static<typeof VOLTAGE.schema>>

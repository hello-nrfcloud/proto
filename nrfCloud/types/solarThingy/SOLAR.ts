import { Type, type Static } from '@sinclair/typebox'
import { messageType, ts } from '../nrfCloud/NRFCloud.js'

export const SOLAR = {
	$id: new URL(
		`https://raw.githubusercontent.com/hello-nrfcloud/proto/types/SOLAR.ts`,
	),
	schema: Type.Object(
		{
			appId: Type.Literal('SOLAR'),
			messageType,
			ts,
			data: Type.String({
				pattern: '^-?[0-9]+.[0-9]+$',
				examples: ['0.000000'],
				description: 'Gain in mA encoded as string',
			}),
		},
		{
			title: 'Gain',
			description: 'Gain in mA from the solar shield',
		},
	),
	name: 'SOLAR',
}

export type TYPE = Readonly<Static<typeof SOLAR.schema>>

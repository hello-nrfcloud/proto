import { Type, type Static } from '@sinclair/typebox'
import { messageType, ts } from '../nrfCloud/NRFCloud.js'

export const BATTERY = {
	$id: new URL(
		`https://raw.githubusercontent.com/hello-nrfcloud/proto/types/BATTERY.ts`,
	),
	schema: Type.Object(
		{
			appId: Type.Literal('BATTERY'),
			messageType,
			ts,
			data: Type.String({
				pattern: '^(0|[1-9][0-9]?|100)$',
				examples: ['94'],
				description: 'Battery capacity in percent encoded as string',
			}),
		},
		{
			title: 'BATTERY',
			description: 'Battery capacity in percent',
		},
	),
	name: 'BATTERY',
}

export type TYPE = Readonly<Static<typeof BATTERY.schema>>

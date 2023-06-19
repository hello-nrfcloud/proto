import { Type, type Static } from '@sinclair/typebox'
import { ts } from '../nrfCloud/NRFCloud.js'

export const LOCATION = {
	$id: new URL(
		`https://raw.githubusercontent.com/hello-nrfcloud/proto/types/LOCATION.ts`,
	),
	schema: Type.Object(
		{
			'@context': Type.Literal(
				'https://github.com/hello-nrfcloud/backend/device-location',
			),
			ts,
			lat: Type.Number({
				minimum: -90,
				maximum: 90,
				examples: [45.524098],
				description: 'GPS latitude',
			}),
			lng: Type.Number({
				minimum: -180,
				maximum: 180,
				examples: [-122.688408],
				description: 'GPS longitude',
			}),
			acc: Type.Number({
				examples: [300],
				description: 'HPE (horizontal positioning error) in meters',
			}),
		},
		{
			title: 'Device location',
			description: 'Coordinates',
		},
	),
	name: 'LOCATION',
}

export type TYPE = Readonly<Static<typeof LOCATION.schema>>

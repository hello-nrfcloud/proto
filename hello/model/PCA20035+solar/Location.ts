import { Type } from '@sinclair/typebox'
import { Thingy91WithSolarShieldContext } from './context.js'
import { ts } from '../../ts.js'
import { accuracy, lat, lng } from '../../../hello/SingleCellGeoLocation.js'

export enum LocationSource {
	MCELL = 'MCELL',
	SCELL = 'SCELL',
	WIFI = 'WIFI',
	GNSS = 'GNSS',
}
export const Location = Type.Object({
	'@context': Thingy91WithSolarShieldContext('location'),
	ts,
	lat,
	lng,
	acc: accuracy,
	src: Type.Enum(LocationSource, {
		description:
			'How the request was fulfilled. WIFI is prioritized by the cloud. Falls back to SCELL/MCELL.',
	}),
	alt: Type.Optional(Type.Number({ description: 'Altitude in meters' })),
	spd: Type.Optional(Type.Number({ description: 'Movement speed in m/s' })),
	hdg: Type.Optional(
		Type.Number({
			minimum: 0,
			maximum: 360,
			description: 'Heading on degree, where 0 degree is north.',
		}),
	),
})

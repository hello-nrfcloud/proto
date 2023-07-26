import { Type } from '@sinclair/typebox'
import { fulfilledWith } from '../nrfCloud/types/generated/GROUND_FIX_C2D.js'
import { Thingy91WithSolarShieldContext } from './model/PCA20035+solar/context.js'
import { ts } from './ts.js'

export const LocationSource = fulfilledWith
export const Location = Type.Object({
	'@context': Thingy91WithSolarShieldContext('location'),
	ts,
	lat: Type.Number({
		minimum: -90,
		maximum: 90,
		examples: [45.524098],
		description: 'Latitude',
	}),
	lng: Type.Number({
		minimum: -180,
		maximum: 180,
		examples: [-122.688408],
		description: 'Longitude',
	}),
	acc: Type.Number({
		examples: [300],
		description: 'HPE (horizontal positioning error) in meters',
	}),
	src: Type.Enum(LocationSource, {
		description:
			'How the request was fulfilled. WIFI is prioritized by the cloud. Falls back to SCELL/MCELL.',
	}),
})

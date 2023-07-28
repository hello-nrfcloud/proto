import { Type } from '@sinclair/typebox'
import { fulfilledWith } from '../../../nrfCloud/types/generated/GROUND_FIX_C2D.js'
import { Thingy91WithSolarShieldContext } from './context.js'
import { ts } from '../../ts.js'
import { accuracy, lat, lng } from '../../../hello/SingleCellGeoLocation.js'

export const LocationSource = fulfilledWith
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
})

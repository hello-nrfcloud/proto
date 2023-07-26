import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import { deviceId } from './deviceId.js'
import { ts } from './ts.js'

export const lat = Type.Number({
	minimum: -90,
	maximum: 90,
	description: 'Latitude in degrees',
})
export const lng = Type.Number({
	minimum: -180,
	maximum: 180,
	description: 'Longitude in degrees',
})
export const accuracy = Type.Number({
	minimum: 0,
	description: 'Accuracy in meters',
})

/**
 * Device geo location based on it's reported network information
 */
export const SingleCellGeoLocation = Type.Object(
	{
		'@context': Type.Literal(Context.singleCellGeoLocation.toString()),
		id: deviceId,
		lat,
		lng,
		accuracy,
		ts,
	},
	{
		$id: new URL(
			`https://raw.githubusercontent.com/hello-nrfcloud/proto/hello/SingleCellGeoLocation.ts`,
		).toString(),
		title: 'SingleCellGeoLocation',
	},
)

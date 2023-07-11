import { Type } from '@sinclair/typebox'
import { Battery, Gain, ts } from '../HelloMessage.js'

export const BatteryData = Type.Omit(Battery, ['@context'])

export const GainData = Type.Omit(Gain, ['@context'])

export const LocationData = Type.Object({
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
	ts,
})

import { Type } from '@sinclair/typebox'
import { ts } from '../HelloMessage.js'

export const BatteryData = Type.Object({
	'%': Type.RegEx(/^(0|[1-9][0-9]?|100)$/, {
		examples: ['94'],
		description: 'Battery capacity in percent encoded as string',
	}),
	ts,
})

export const GainData = Type.Object({
	mA: Type.Number({
		minimum: 0,
		examples: [3.123],
		description: 'Gain from solar shield in mA',
	}),
	ts,
})

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

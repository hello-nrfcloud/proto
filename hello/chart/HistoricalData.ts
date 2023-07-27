import { Type } from '@sinclair/typebox'
import { Gain } from '../model/PCA20035+solar/Gain.js'
import { Location } from '../model/PCA20035+solar/Location.js'
import { ts } from '../ts.js'

export const BatteryData = Type.Object({
	ts,
	// History contains averages, which are floats
	'%': Type.Number({
		minimum: 0,
		maximum: 100,
		examples: [94.5],
		description: 'Battery capacity in percent',
	}),
})

export const GainData = Type.Pick(Gain, ['mA', 'ts'])

export const LocationData = Type.Pick(Location, ['lat', 'lng', 'acc', 'ts'])

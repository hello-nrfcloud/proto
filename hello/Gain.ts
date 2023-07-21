import { Type } from '@sinclair/typebox'
import { Thingy91WithSolarShieldContext } from './Thingy91WithSolarShieldContext.js'
import { ts } from './ts.js'

export const Gain = Type.Object({
	'@context': Thingy91WithSolarShieldContext('gain'),
	ts,
	mA: Type.Number({
		minimum: 0,
		examples: [3.123],
		description: 'Gain from solar shield in mA',
	}),
})

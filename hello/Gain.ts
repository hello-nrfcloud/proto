import { Type } from '@sinclair/typebox'
import { Thingy91WithSolarShieldContext } from './Thingy91WithSolarShieldContext.js'
import { ts } from './ts.js'

export const Gain = Type.Object({
	'@context': Thingy91WithSolarShieldContext('gain'),
	ts,
	mA: Type.Number({
		examples: [3.123, -0.0032],
		description: 'Gain from solar shield in mA',
	}),
})

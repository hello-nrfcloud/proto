import { Type } from '@sinclair/typebox'
import { Thingy91WithSolarShieldContext } from './Thingy91WithSolarShieldContext.js'
import { ts } from './ts.js'

export const Battery = Type.Object({
	'@context': Thingy91WithSolarShieldContext('battery'),
	ts,
	'%': Type.Integer({
		minimum: 0,
		maximum: 100,
		examples: [94],
		description: 'Battery capacity in percent',
	}),
})

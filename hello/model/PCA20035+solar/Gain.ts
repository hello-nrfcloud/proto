import { Type } from '@sinclair/typebox'
import { Thingy91WithSolarShieldContext } from './context.js'
import { ts } from '../../ts.js'

/**
 * @deprecated See https://github.com/hello-nrfcloud/proto/issues/137
 */
export const Gain = Type.Object({
	'@context': Thingy91WithSolarShieldContext('gain'),
	ts,
	mA: Type.Number({
		examples: [3.123, -0.0032],
		description: 'Gain from solar shield in mA',
	}),
})

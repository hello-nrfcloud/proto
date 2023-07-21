import { Type, type TLiteral } from '@sinclair/typebox'
import { Context } from './Context.js'
import { Model } from './proto.js'

export const Thingy91WithSolarShieldContext = (
	transformerId: string,
): TLiteral<string> =>
	Type.Literal(
		Context.model(Model.Thingy91WithSolarShield)
			.transformed(transformerId)
			.toString(),
	)

import { Type, type TLiteral } from '@sinclair/typebox'
import { Context } from '../../Context.js'
import { Model } from '../Model.js'

/**
 * @deprecated See https://github.com/hello-nrfcloud/proto/issues/137
 */
export const Thingy91WithSolarShieldContext = (
	transformerId: string,
): TLiteral<string> =>
	Type.Literal(
		Context.model(Model.Thingy91WithSolarShield)
			.transformed(transformerId)
			.toString(),
	)

import { Type, type Static } from '@sinclair/typebox'
import { Context } from './Context.js'
import { LwM2MObjectInstance } from '@hello.nrfcloud.com/proto-map/api'

export const Shadow = Type.Object({
	'@context': Type.Literal(Context.shadow.toString()),
	reported: Type.Array(LwM2MObjectInstance),
	desired: Type.Array(LwM2MObjectInstance),
})

export type ShadowType = Static<typeof Shadow>

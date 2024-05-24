import { Type, type Static } from '@sinclair/typebox'
import { IsoDateType } from './IsoDateType.js'
import { Context } from './Context.js'
import { LwM2MObjectInstance } from '@hello.nrfcloud.com/proto-map/api'

export const Shadow = Type.Object({
	'@context': Type.Literal(Context.shadow.toString()),
	reported: Type.Array(LwM2MObjectInstance),
	desired: Type.Array(LwM2MObjectInstance),
	version: Type.Number({
		minimum: 1,
		title: 'Version',
		description: 'The version of the shadow document.',
	}),
	updatedAt: IsoDateType(
		'The timestamp when the shadow document was last updated formatted as an ISO 8601 string',
	),
})

export type ShadowType = Static<typeof Shadow>

import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import {
	ObjectID,
	ObjectInstanceID,
	ObjectVersion,
	Resources,
} from '@hello.nrfcloud.com/proto-map/api'
import { IsoDateType } from './IsoDateType.js'

/**
 * Similar to the message for `hello.nrfcloud.com/map` but without the deviceId
 * @see https://github.com/hello-nrfcloud/proto-map/blob/813ebea3debfa45319816dc477eada329d66eb64/api/ResourceUpdate.ts
 */
export const LwM2MResourceUpdate = Type.Object(
	{
		'@context': Type.Literal(Context.lwm2mResourceUpdate.toString()),
		ObjectID,
		ObjectInstanceID,
		ObjectVersion,
		Resources,
		ts: IsoDateType('Time when the update was received, formatted as ISO 8601'),
	},
	{
		title: 'Resource update',
		description: 'Describes an update to a LwM2M resource for a device.',
	},
)

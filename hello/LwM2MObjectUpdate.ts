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
 * @see https://github.com/hello-nrfcloud/proto-map/blob/616debda859e184952a25a2c6f8224f9feff9df2/api/ObjectUpdate.ts
 */
export const LwM2MObjectUpdate = Type.Object(
	{
		'@context': Type.Literal(Context.lwm2mObjectUpdate.toString()),
		ObjectID,
		ObjectInstanceID: Type.Optional(ObjectInstanceID),
		ObjectVersion: Type.Optional(ObjectVersion),
		Resources,
		ts: IsoDateType('Time when the update was received, formatted as ISO 8601'),
	},
	{
		title: 'Object update',
		description: 'Describes an update to a LwM2M object for a device.',
	},
)

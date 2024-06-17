import {
	ObjectID,
	ObjectInstanceID,
	ObjectVersion,
	Resources,
} from '@hello.nrfcloud.com/proto-map/api'
import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import { deviceId } from './deviceId.js'

export const LwM2MObjectHistory = Type.Object(
	{
		'@context': Type.Literal(Context.lwm2mObjectHistory.toString()),
		partialInstances: Type.Array(Resources, {
			title:
				'The resources of the object instance. The time resource should reflect the start of the bucket.',
		}),
		query: Type.Object(
			{
				ObjectID,
				ObjectInstanceID,
				ObjectVersion,
				binIntervalMinutes: Type.Number({
					minimum: 1,
					title: 'The number of minutes the results are binned to.',
					examples: [15],
				}),
				deviceId,
			},
			{ title: `The query that was used` },
		),
	},
	{
		title: 'LwM2M Object history',
		description: 'Contains historical values of an LwM2M object for a device.',
	},
)

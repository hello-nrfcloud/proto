import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import {
	ObjectID,
	ObjectInstanceID,
	ObjectVersion,
	Resources,
} from '@hello.nrfcloud.com/proto-map/api'
import { Timestamp } from './Timestamp.js'
import { deviceId } from './deviceId.js'

export const LwM2MObjectHistory = Type.Object(
	{
		'@context': Type.Literal(Context.lwm2mObjectHistory.toString()),
		partialInstances: Type.Array(
			Type.Intersect(
				[
					Resources,
					Type.Object({
						ts: Timestamp,
					}),
				],
				{
					title:
						'The resources of the object instance and the timestamp the data was received.',
				},
			),
		),
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

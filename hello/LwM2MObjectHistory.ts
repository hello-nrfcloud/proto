import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import {
	ObjectID,
	ObjectInstanceID,
	ObjectVersion,
	Resources,
} from '@hello.nrfcloud.com/proto-map/api'
import { deviceId } from './deviceId.js'
import { IsoDateType } from './IsoDateType.js'

export const LwM2MObjectHistory = Type.Object(
	{
		'@context': Type.Literal(Context.lwm2mObjectHistory.toString()),
		partialInstances: Type.Array(
			Type.Union([
				Resources,
				Type.Object({
					ts: IsoDateType(
						'Timestamp when the object was written, or in case of aggregates the beginning of the binned time span.',
					),
				}),
			]),
			{
				title:
					'The resources of the object instance. Does not include the Time resource.',
			},
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

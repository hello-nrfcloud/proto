import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import { IsoDateType } from './IsoDateType.js'
import { deviceId } from './deviceId.js'

export const DeviceIdentity = Type.Object(
	{
		'@context': Type.Literal(Context.deviceIdentity.toString()),
		id: deviceId,
		model: Type.String({
			minLength: 1,
			description: 'the device model',
			examples: ['PCA20035', 'PCA20035+solar'],
		}),
		lastSeen: Type.Optional(
			IsoDateType(
				'Time formatted as ISO 8601 string when the device last sent in a message.',
			),
		),
	},
	{
		title: 'DeviceIdentity',
	},
)

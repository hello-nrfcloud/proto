import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import { isoDateRegExp } from './isoDateRegExp.js'
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
			Type.RegExp(isoDateRegExp, {
				description:
					'Time formatted as ISO 8601 string when the device last sent in a message.',
			}),
		),
	},
	{
		$id: new URL(
			`https://raw.githubusercontent.com/hello-nrfcloud/proto/hello/DeviceIdentity.ts`,
		).toString(),
		title: 'DeviceIdentity',
	},
)

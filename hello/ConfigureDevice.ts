import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import { deviceId } from './deviceId.js'

const ConfigurationRequest = Type.Object(
	{
		'@id': Type.Optional(Type.String()),
		id: deviceId,
		configuration: Type.Object({
			gnss: Type.Optional(
				Type.Boolean({
					description:
						'true: turn on GNSS location, false: turn off GNSS location',
				}),
			),
		}),
	},
	{
		description: 'Configures a device',
	},
)

export const ConfigureDevice = Type.Composite([
	Type.Object({
		'@context': Type.Literal(Context.configureDevice.toString()),
		shadowVersion: Type.Integer({
			minimum: 1,
			description: `The current shadow version`,
		}),
	}),
	ConfigurationRequest,
])

export const DeviceConfigured = Type.Composite([
	Type.Object({
		'@context': Type.Literal(Context.deviceConfigured.toString()),
		shadowVersion: Type.Integer({
			minimum: 1,
			description: `The updated shadow version`,
		}),
	}),
	ConfigurationRequest,
])

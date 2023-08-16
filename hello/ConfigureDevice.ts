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
			updateIntervalSeconds: Type.Optional(
				Type.Integer({
					minimum: 60,
					description:
						'Update interval in seconds: how often the device should send data to the cloud.',
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
	}),
	ConfigurationRequest,
])

export const DeviceConfigured = Type.Composite([
	Type.Object({
		'@context': Type.Literal(Context.deviceConfigured.toString()),
	}),
	ConfigurationRequest,
])

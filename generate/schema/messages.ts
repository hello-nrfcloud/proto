import ground_fix_response from '../../nrfcloud-application-protocols/schemas/cloudToDevice/ground_fix/ground-fix.json' assert { type: 'json' }
import ipShadowConfig from '../../nrfcloud-application-protocols/schemas/deviceShadow/ipShadow/config.json' assert { type: 'json' }
import ipShadow from '../../nrfcloud-application-protocols/schemas/deviceShadow/ipShadow/ipShadow.json' assert { type: 'json' }
import agps from '../../nrfcloud-application-protocols/schemas/deviceToCloud/agps/agps.json' assert { type: 'json' }
import air_press from '../../nrfcloud-application-protocols/schemas/deviceToCloud/air_press/air_press.json' assert { type: 'json' }
import air_quality from '../../nrfcloud-application-protocols/schemas/deviceToCloud/air_quality/air_quality.json' assert { type: 'json' }
import button from '../../nrfcloud-application-protocols/schemas/deviceToCloud/button/button.json' assert { type: 'json' }
import cell_position from '../../nrfcloud-application-protocols/schemas/deviceToCloud/cell_position/cell-position.json' assert { type: 'json' }
import device from '../../nrfcloud-application-protocols/schemas/deviceToCloud/device/device.json' assert { type: 'json' }
import flip from '../../nrfcloud-application-protocols/schemas/deviceToCloud/flip/flip.json' assert { type: 'json' }
import gnss from '../../nrfcloud-application-protocols/schemas/deviceToCloud/gnss/gnss.json' assert { type: 'json' }
import ground_fix from '../../nrfcloud-application-protocols/schemas/deviceToCloud/ground_fix/ground-fix.json' assert { type: 'json' }
import humid from '../../nrfcloud-application-protocols/schemas/deviceToCloud/humid/humid.json' assert { type: 'json' }
import light from '../../nrfcloud-application-protocols/schemas/deviceToCloud/light/light.json' assert { type: 'json' }
import pgps from '../../nrfcloud-application-protocols/schemas/deviceToCloud/pgps/pgps.json' assert { type: 'json' }
import rsrp from '../../nrfcloud-application-protocols/schemas/deviceToCloud/rsrp/rsrp.json' assert { type: 'json' }
import scell from '../../nrfcloud-application-protocols/schemas/deviceToCloud/single_cell/single-cell.json' assert { type: 'json' }
import temp from '../../nrfcloud-application-protocols/schemas/deviceToCloud/temp/temp.json' assert { type: 'json' }
import wifi from '../../nrfcloud-application-protocols/schemas/deviceToCloud/wifi/wifi-position.json' assert { type: 'json' }

const toId = (id: string): URL =>
	new URL(
		`https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/${id}`,
	)

export const wifiMessage = {
	$id: toId('deviceToCloud/wifi/wifi-position.json'),
	schema: wifi,
	name: `${wifi.properties.appId.const}`,
}
export const tempMessage = {
	$id: toId('deviceToCloud/temp/temp.json'),
	schema: temp,
	name: `${temp.properties.appId.const}`,
}
export const scellMessage = {
	$id: toId('deviceToCloud/single_cell/single-cell.json'),
	schema: scell,
	name: `${scell.properties.appId.const}`,
}
export const rsrpMessage = {
	$id: toId('deviceToCloud/rsrp/rsrp.json'),
	schema: rsrp,
	name: `${rsrp.properties.appId.const}`,
}
export const pgpsMessage = {
	$id: toId('deviceToCloud/pgps/pgps.json'),
	schema: pgps,
	name: `${pgps.properties.appId.const}`,
}
export const lightMessage = {
	$id: toId('deviceToCloud/light/light.json'),
	schema: light,
	name: `${light.properties.appId.const}`,
}
export const humidMessage = {
	$id: toId('deviceToCloud/humid/humid.json'),
	schema: humid,
	name: `${humid.properties.appId.const}`,
}
export const groundFixMessage = {
	$id: toId('deviceToCloud/ground_fix/ground-fix.json'),
	schema: ground_fix,
	name: `${ground_fix.properties.appId.const}`,
}
export const groundFixResponseMessage = {
	$id: toId('cloudToDevice/ground_fix/ground-fix.json'),
	schema: ground_fix_response,
	name: `${ground_fix_response.properties.appId.const}_C2D`,
}
export const gnssMessage = {
	$id: toId('deviceToCloud/gnss/gnss.json'),
	schema: gnss,
	name: 'GNSS',
}
export const flipMessage = {
	$id: toId('deviceToCloud/flip/flip.json'),
	schema: flip,
	name: `${flip.properties.appId.const}`,
}
export const deviceInfoMessage = {
	$id: toId('deviceToCloud/device/device.json'),
	schema: {
		...device,
		definitions: {
			...device.definitions,
			NetworkInfo: {
				...device.definitions.NetworkInfo,
				properties: {
					...device.definitions.NetworkInfo.properties,
					// Sent by
					eest: {
						type: 'integer',
						enum: [5, 6, 7, 8, 9],
						description:
							'The %CONEVAL AT command returns amongst other data the energy estimate: Relative estimated energy consumption of data transmission compared to nominal consumption. A higher value means smaller energy consumption. 5: Difficulties in setting up connections. Maximum number of repetitions might be needed for data. 6: Poor conditions. Setting up a connection might require retries and a higher number of repetitions for data. 7: Normal conditions for cIoT device. No repetitions for data or only a few repetitions in the worst case. 8: Good conditions. Possibly very good conditions for small amounts of data. 9: Very good conditions. Efficient data transfer estimated also for larger amounts of data.',
						examples: [5, 7],
					},
				},
			},
		},
	},
	name: `${device.properties.appId.const}`,
}
export const cellPositionMessage = {
	$id: toId('deviceToCloud/cell_position/cell-position.json'),
	schema: cell_position,
	name: `${cell_position.properties.appId.const}`,
}
export const buttonMessage = {
	$id: toId('deviceToCloud/button/button.json'),
	schema: button,
	name: `${button.properties.appId.const}`,
}
export const airQualityMessage = {
	$id: toId('deviceToCloud/air_quality/air_quality.json'),
	schema: air_quality,
	name: `${air_quality.properties.appId.const}`,
}
export const airPressMessage = {
	$id: toId('deviceToCloud/air_press/air_press.json'),
	schema: air_press,
	name: `${air_press.properties.appId.const}`,
}
export const agpsMessage = {
	$id: toId('deviceToCloud/agps/agps.json'),
	schema: agps,
	name: `${agps.properties.appId.const}`,
}
/**
 * List of messages that types and validation is built for
 */
export const messages: {
	$id: URL
	schema: any
	name: string
}[] = [
	wifiMessage,
	tempMessage,
	scellMessage,
	rsrpMessage,
	pgpsMessage,
	lightMessage,
	humidMessage,
	groundFixMessage,
	groundFixResponseMessage,
	gnssMessage,
	flipMessage,
	deviceInfoMessage,
	cellPositionMessage,
	buttonMessage,
	airQualityMessage,
	airPressMessage,
	agpsMessage,
]

// The references to the config.json are resolved manually below because that was the less complicated way to solve the only schema that uses references
export const ipShadowMessage: {
	$id: URL
	schema: any
	name: string
} = {
	$id: toId('deviceShadow/ipShadow/ipShadow.json'),
	schema: {
		...ipShadow,
		$id: toId('deviceShadow/ipShadow/ipShadow.json').toString(),
		description:
			'The reported state of an IP device using AWS IoT Shadow (https://docs.aws.amazon.com/iot/latest/developerguide/iot-device-shadows.html).',
		definitions: {
			...ipShadow.definitions,
			DeviceShadowIP: {
				...ipShadow.definitions.DeviceShadowIP,
				properties: {
					...ipShadow.definitions.DeviceShadowIP.properties,
					// Allow for AWS shadow properties retrieved from REST API
					version: {
						type: 'number',
						minimum: 1,
					},
					metadata: {
						type: 'object',
						properties: {
							desired: {
								type: 'object',
								properties: {
									timestamp: {
										type: 'integer',
									},
								},
							},
						},
					},
				},
				additionalProperties: false,
			},
			Desired: {
				...ipShadow.definitions.Desired,
				properties: {
					config: ipShadowConfig.definitions.Config,
				},
				additionalProperties: true,
			},
			Reported: {
				...ipShadow.definitions.Reported,
				properties: {
					config: ipShadowConfig.definitions.Config,
					connection: ipShadow.definitions.Connection,
					device: ipShadow.definitions.Device,
				},
				additionalProperties: true,
			},
			Gps: ipShadowConfig.definitions.Gps,
		},
	},
	name: 'ipShadow',
}

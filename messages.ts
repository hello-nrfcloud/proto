import agps_c2d from './nrfcloud-application-protocols/schemas/cloudToDevice/agps/agps.json'
import air_quality_c2d from './nrfcloud-application-protocols/schemas/cloudToDevice/air_quality/air_quality.json'
import cell_position_c2d from './nrfcloud-application-protocols/schemas/cloudToDevice/cell_position/cell-position.json'
import device_c2d from './nrfcloud-application-protocols/schemas/cloudToDevice/device/device.json'
import env_c2d from './nrfcloud-application-protocols/schemas/cloudToDevice/env/env.json'
import gps_c2d from './nrfcloud-application-protocols/schemas/cloudToDevice/gps/gps.json'
import ground_fix_c2d from './nrfcloud-application-protocols/schemas/cloudToDevice/ground_fix/ground-fix.json'
import led_c2d from './nrfcloud-application-protocols/schemas/cloudToDevice/led/led.json'
import light_c2d from './nrfcloud-application-protocols/schemas/cloudToDevice/light/light.json'
import modem_c2d from './nrfcloud-application-protocols/schemas/cloudToDevice/modem/modem.json'
import scell_c2d from './nrfcloud-application-protocols/schemas/cloudToDevice/single_cell/single-cell.json'
import temp_c2d from './nrfcloud-application-protocols/schemas/cloudToDevice/temp/temp.json'
import wifi_c2d from './nrfcloud-application-protocols/schemas/cloudToDevice/wifi/wifi-position.json'
import ipShadowConfig from './nrfcloud-application-protocols/schemas/deviceShadow/ipShadow/config.json'
import ipShadow from './nrfcloud-application-protocols/schemas/deviceShadow/ipShadow/ipShadow.json'
import agps_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/agps/agps.json'
import air_press_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/air_press/air_press.json'
import air_quality_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/air_quality/air_quality.json'
import button_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/button/button.json'
import cell_position_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/cell_position/cell-position.json'
import device_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/device/device.json'
import flip_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/flip/flip.json'
import gnss_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/gnss/gnss.json'
import ground_fix_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/ground_fix/ground-fix.json'
import humid_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/humid/humid.json'
import light_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/light/light.json'
import pgps_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/pgps/pgps.json'
import rsrp_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/rsrp/rsrp.json'
import scell_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/single_cell/single-cell.json'
import temp_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/temp/temp.json'
import wifi_d2c from './nrfcloud-application-protocols/schemas/deviceToCloud/wifi/wifi-position.json'

const toId = (id: string): URL =>
	new URL(
		`https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/${id}`,
	)

/**
 * List of messages that types and validation is built for
 */
export const messages: {
	$id: URL
	schema: any
	name: string
}[] = [
	{
		$id: toId('cloudToDevice/wifi/wifi-position.json'),
		schema: wifi_c2d,
		name: `${wifi_c2d.properties.appId.const}_C2D`,
	},
	{
		$id: toId('cloudToDevice/temp/temp.json'),
		schema: temp_c2d,
		name: `${temp_c2d.properties.appId.const}_C2D`,
	},
	{
		$id: toId('cloudToDevice/single_cell/single-cell.json'),
		schema: scell_c2d,
		name: `${scell_c2d.properties.appId.const}_C2D`,
	},
	{
		$id: toId('cloudToDevice/modem/modem.json'),
		schema: modem_c2d,
		name: `${modem_c2d.properties.appId.const}_C2D`,
	},
	{
		$id: toId('cloudToDevice/light/light.json'),
		schema: light_c2d,
		name: `${light_c2d.properties.appId.const}_C2D`,
	},
	{
		$id: toId('cloudToDevice/led/led.json'),
		schema: led_c2d,
		name: `${led_c2d.properties.appId.const}_C2D`,
	},
	{
		$id: toId('cloudToDevice/ground_fix/ground-fix.json'),
		schema: ground_fix_c2d,
		name: `${ground_fix_c2d.properties.appId.const}_C2D`,
	},
	{
		$id: toId('cloudToDevice/gps/gps.json'),
		schema: gps_c2d,
		name: `${gps_c2d.properties.appId.const}_C2D`,
	},
	{
		$id: toId('cloudToDevice/env/env.json'),
		schema: env_c2d,
		name: `${env_c2d.properties.appId.const}_C2D`,
	},
	{
		$id: toId('cloudToDevice/device/device.json'),
		schema: device_c2d,
		name: `${device_c2d.properties.appId.const}_C2D`,
	},
	{
		$id: toId('cloudToDevice/cell_position/cell-position.json'),
		schema: cell_position_c2d,
		name: `${cell_position_c2d.properties.appId.const}_C2D`,
	},
	{
		$id: toId('cloudToDevice/air_quality/air_quality.json'),
		schema: air_quality_c2d,
		name: `${air_quality_c2d.properties.appId.const}_C2D`,
	},
	{
		$id: toId('cloudToDevice/agps/agps.json'),
		schema: agps_c2d,
		name: `${agps_c2d.properties.appId.const}_C2D`,
	},
	{
		$id: toId('deviceToCloud/wifi/wifi-position.json'),
		schema: wifi_d2c,
		name: `${wifi_d2c.properties.appId.const}_D2C`,
	},
	{
		$id: toId('deviceToCloud/temp/temp.json'),
		schema: temp_d2c,
		name: `${temp_d2c.properties.appId.const}_D2C`,
	},
	{
		$id: toId('deviceToCloud/single_cell/single-cell.json'),
		schema: scell_d2c,
		name: `${scell_d2c.properties.appId.const}_D2C`,
	},
	{
		$id: toId('deviceToCloud/rsrp/rsrp.json'),
		schema: rsrp_d2c,
		name: `${rsrp_d2c.properties.appId.const}_D2C`,
	},
	{
		$id: toId('deviceToCloud/pgps/pgps.json'),
		schema: pgps_d2c,
		name: `${pgps_d2c.properties.appId.const}_D2C`,
	},
	{
		$id: toId('deviceToCloud/light/light.json'),
		schema: light_d2c,
		name: `${light_d2c.properties.appId.const}_D2C`,
	},
	{
		$id: toId('deviceToCloud/humid/humid.json'),
		schema: humid_d2c,
		name: `${humid_d2c.properties.appId.const}_D2C`,
	},
	{
		$id: toId('deviceToCloud/ground_fix/ground-fix.json'),
		schema: ground_fix_d2c,
		name: `${ground_fix_d2c.properties.appId.const}_D2C`,
	},
	{
		$id: toId('deviceToCloud/gnss/gnss.json'),
		schema: gnss_d2c,
		name: 'GNSS_D2C',
	},
	{
		$id: toId('deviceToCloud/flip/flip.json'),
		schema: flip_d2c,
		name: `${flip_d2c.properties.appId.const}_D2C`,
	},
	{
		$id: toId('deviceToCloud/device/device.json'),
		schema: device_d2c,
		name: `${device_d2c.properties.appId.const}_D2C`,
	},
	{
		$id: toId('deviceToCloud/cell_position/cell-position.json'),
		schema: cell_position_d2c,
		name: `${cell_position_d2c.properties.appId.const}_D2C`,
	},
	{
		$id: toId('deviceToCloud/button/button.json'),
		schema: button_d2c,
		name: `${button_d2c.properties.appId.const}_D2C`,
	},
	{
		$id: toId('deviceToCloud/air_quality/air_quality.json'),
		schema: air_quality_d2c,
		name: `${air_quality_d2c.properties.appId.const}_D2C`,
	},
	{
		$id: toId('deviceToCloud/air_press/air_press.json'),
		schema: air_press_d2c,
		name: `${air_press_d2c.properties.appId.const}_D2C`,
	},
	{
		$id: toId('deviceToCloud/agps/agps.json'),
		schema: agps_d2c,
		name: `${agps_d2c.properties.appId.const}_D2C`,
	},
	// Contains only the reported part of the device shadow.
	// The references to the config.json are resolved manually below because that was the less complicated way to solve the only schema that uses references
	{
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
						reported: {
							...ipShadow.definitions.DeviceShadowIP.properties.reported,
						},
					},
					required: ['reported'],
				},
				Desired: {
					...ipShadow.definitions.Desired,
					properties: {
						...ipShadow.definitions.Desired.properties,
						config: ipShadowConfig.definitions.Config,
					},
				},
				Reported: {
					...ipShadow.definitions.Reported,
					properties: {
						...ipShadow.definitions.Reported.properties,
						config: ipShadowConfig.definitions.Config,
					},
				},
				Gps: ipShadowConfig.definitions.Gps,
			},
		},
		name: 'ipShadow',
	},
]

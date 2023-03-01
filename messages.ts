import path from 'node:path'

/**
 * List of messages that types and validation is built for
 */
export const messages: { path: string; $id: URL }[] = [
	'cloudToDevice/wifi/wifi-position.json',
	'cloudToDevice/temp/temp.json',
	'cloudToDevice/single_cell/single-cell.json',
	'cloudToDevice/pgps-error/pgps.json',
	'cloudToDevice/modem/modem.json',
	'cloudToDevice/light/light.json',
	'cloudToDevice/led/led.json',
	'cloudToDevice/ground_fix/ground-fix.json',
	'cloudToDevice/gps/gps.json',
	'cloudToDevice/env/env.json',
	'cloudToDevice/device/device.json',
	'cloudToDevice/cell_position/cell-position.json',
	'cloudToDevice/air_quality/air_quality.json',
	'cloudToDevice/agps/agps.json',
	'deviceToCloud/wifi/wifi-position.json',
	'deviceToCloud/temp/temp.json',
	'deviceToCloud/single_cell/single-cell.json',
	'deviceToCloud/rsrp/rsrp.json',
	'deviceToCloud/pgps/pgps.json',
	'deviceToCloud/light/light.json',
	'deviceToCloud/humid/humid.json',
	'deviceToCloud/ground_fix/ground-fix.json',
	'deviceToCloud/gnss/gnss.json',
	'deviceToCloud/flip/flip.json',
	'deviceToCloud/device/device.json',
	'deviceToCloud/cell_position/cell-position.json',
	'deviceToCloud/button/button.json',
	'deviceToCloud/air_quality/air_quality.json',
	'deviceToCloud/air_press/air_press.json',
	'deviceToCloud/agps/agps.json',
].map((f) => ({
	path: path.join(
		process.cwd(),
		'nrfcloud-application-protocols',
		'schemas',
		f,
	),
	$id: new URL(
		`https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/${f}`,
	),
}))

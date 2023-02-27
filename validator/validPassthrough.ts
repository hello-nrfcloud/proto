import { readFileSync } from 'fs'
import path from 'node:path/posix'
import type { NRFCloudMessageEnvelope } from 'types/NRFCloudMessageEnvelope'
import schema from './NRFCloudMessage.schema.json'
import { validateWithJSONSchema } from './validateWithJSONSchema.js'

const validator = validateWithJSONSchema(
	schema,
	[
		'cloudToDevice/agps/agps.json',
		'cloudToDevice/air_quality/air_quality.json',
		'cloudToDevice/cell_position/cell-position.json',
		'cloudToDevice/device/device.json',
		'cloudToDevice/env/env.json',
		'cloudToDevice/gps/gps.json',
		'cloudToDevice/ground_fix/ground-fix.json',
		'cloudToDevice/led/led.json',
		'cloudToDevice/light/light.json',
		'cloudToDevice/modem/modem.json',
		'cloudToDevice/pgps-error/pgps.json',
		'cloudToDevice/single_cell/single-cell.json',
		'cloudToDevice/temp/temp.json',
		'cloudToDevice/wifi/wifi-position.json',
		'deviceToCloud/agps/agps.json',
		'deviceToCloud/air_press/air_press.json',
		'deviceToCloud/air_quality/air_quality.json',
		'deviceToCloud/button/button.json',
		'deviceToCloud/cell_position/cell-position.json',
		'deviceToCloud/device/device.json',
		'deviceToCloud/flip/flip.json',
		'deviceToCloud/gnss/gnss.json',
		'deviceToCloud/ground_fix/ground-fix.json',
		'deviceToCloud/humid/humid.json',
		'deviceToCloud/light/light.json',
		'deviceToCloud/pgps/pgps.json',
		'deviceToCloud/rsrp/rsrp.json',
		'deviceToCloud/single_cell/single-cell.json',
		'deviceToCloud/temp/temp.json',
		'deviceToCloud/wifi/wifi-position.json',
	].map((s) => ({
		$id: `https://raw.githubusercontent.com/nRFCloud/application-protocols/v1/schemas/${s}`,
		...JSON.parse(
			readFileSync(
				path.join(
					process.cwd(),
					'nrfcloud-application-protocols',
					'schemas',
					s,
				),
				'utf-8',
			),
		),
	})),
)

export const validPassthrough = (
	v: NRFCloudMessageEnvelope,
): NRFCloudMessageEnvelope | undefined => {
	const isValid = validator(v)
	if ('errors' in isValid) {
		console.debug(
			'[validPassthrough]',
			'Dropped',
			v,
			{ schema },
			{
				errors: isValid.errors,
			},
		)
		return
	}
	return v
}

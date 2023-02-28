import { readFileSync } from 'node:fs'
import path from 'node:path'
import { validPassthrough } from '../validator/validPassthrough'

describe('examples', () => {
	it.each([
		'cloudToDevice/GROUND_FIX.json',
		'deviceToCloud/BUTTON.json',
		'deviceToCloud/GROUND_FIX.json',
		'deviceToCloud/TEMP.json',
		// FIXME: implement schemas
		// 'deviceToCloud/DEVICE-networkInfo.json',
		// 'deviceToCloud/DEVICE-deviceInfo.json',
	])('should validate %s', (example) =>
		expect(
			validPassthrough(
				JSON.parse(
					readFileSync(path.join(process.cwd(), 'examples', example), 'utf-8'),
				),
			),
		).not.toBeNull(),
	)
})

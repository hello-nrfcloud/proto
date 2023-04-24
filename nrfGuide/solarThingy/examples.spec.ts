import type { NRFCloudMessage, ipShadow } from '@nrf.guide/proto/nrfCloud'
import { validPassthrough } from '../../nrfCloud/validPassthrough.js'
import DEVICE_eest from './DEVICE-networkInfo-with-eest.json'
import SOLAR from './SOLAR.json'
import VOLTAGE from './VOLTAGE.json'

describe('Solar Thingy example messages', () => {
	it.each([DEVICE_eest, SOLAR, VOLTAGE])(
		'should validate message %j',
		(example) => {
			const result = validPassthrough(
				example as NRFCloudMessage | ipShadow,
				(_, error) => console.error(JSON.stringify(error)),
			)
			expect(result).not.toBeNull()
		},
	)
})

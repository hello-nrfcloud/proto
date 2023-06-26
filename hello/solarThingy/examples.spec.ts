import type {
	NRFCloudMessage,
	ipShadow,
} from '@hello.nrfcloud.com/proto/nrfCloud'
import { validPassthrough } from '../../nrfCloud/validPassthrough.js'
import BATTERY from './BATTERY.json' assert { type: 'json' }
import DEVICE_eest from './DEVICE-networkInfo-with-eest.json' assert { type: 'json' }
import SOLAR from './SOLAR.json' assert { type: 'json' }

describe('Solar Thingy example messages', () => {
	it.each([DEVICE_eest, SOLAR, BATTERY])(
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

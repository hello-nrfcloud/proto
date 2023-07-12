import {
	type NRFCloudMessage,
	type ipShadow,
	validator,
} from '@hello.nrfcloud.com/proto/nrfCloud'
import BATTERY from './BATTERY.json' assert { type: 'json' }
import DEVICE_eest from './DEVICE-networkInfo-with-eest.json' assert { type: 'json' }
import SOLAR from './SOLAR.json' assert { type: 'json' }

describe('Solar Thingy example messages', () => {
	it.each([DEVICE_eest, SOLAR, BATTERY])(
		'should validate message %j',
		(example) => {
			const result = validator(example as NRFCloudMessage | ipShadow)
			expect('value' in result && result.value).not.toBeNull()
		},
	)
})

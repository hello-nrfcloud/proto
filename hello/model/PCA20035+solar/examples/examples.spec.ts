import {
	type NRFCloudMessage,
	type ipShadow,
	validator,
} from '@hello.nrfcloud.com/proto/nrfCloud'
import BATTERY from './BATTERY.json' assert { type: 'json' }
import DEVICE_eest from './DEVICE-networkInfo-with-eest.json' assert { type: 'json' }
import SOLAR from './SOLAR.json' assert { type: 'json' }
import { describe, test as it } from 'node:test'
import assert from 'node:assert/strict'

void describe('Solar Thingy example messages', () => {
	for (const example of [DEVICE_eest, SOLAR, BATTERY]) {
		void it(`should validate message ${JSON.stringify(example)}`, () => {
			const result = validator(example as NRFCloudMessage | ipShadow)
			assert.equal('value' in result, true)
			assert.notEqual('value' in result && result.value, null)
		})
	}
})

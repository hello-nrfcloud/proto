import {
	validator,
	type NRFCloudMessage,
	type ipShadow,
} from '@hello.nrfcloud.com/proto/nrfCloud'
import AIR_PRESS from '../nrfCloud/examples/deviceToCloud/AIR_PRESS.json' assert { type: 'json' }
import AIR_QUAL from '../nrfCloud/examples/deviceToCloud/AIR_QUAL.json' assert { type: 'json' }
import BUTTON from '../nrfCloud/examples/deviceToCloud/BUTTON.json' assert { type: 'json' }
import DEVICE_info from '../nrfCloud/examples/deviceToCloud/DEVICE-deviceInfo.json' assert { type: 'json' }
import DEVICE_network from '../nrfCloud/examples/deviceToCloud/DEVICE-networkInfo.json' assert { type: 'json' }
import GROUND_FIX from '../nrfCloud/examples/deviceToCloud/GROUND_FIX.json' assert { type: 'json' }
import HUMID from '../nrfCloud/examples/deviceToCloud/HUMID.json' assert { type: 'json' }
import RSRP from '../nrfCloud/examples/deviceToCloud/RSRP.json' assert { type: 'json' }
import TEMP from '../nrfCloud/examples/deviceToCloud/TEMP.json' assert { type: 'json' }
import shadowNoNetworkInfo from '../nrfCloud/examples/shadow-no-networkInfo.json' assert { type: 'json' }
import shadow from '../nrfCloud/examples/shadow.json' assert { type: 'json' }
import { describe, test as it } from 'node:test'
import assert from 'node:assert/strict'

void describe('nRF Cloud example messages', () => {
	for (const example of [
		DEVICE_info,
		GROUND_FIX,
		HUMID,
		TEMP,
		DEVICE_network,
		AIR_QUAL,
		AIR_PRESS,
		RSRP,
		BUTTON,
		// Partial response from GET https://api.nrfcloud.com/v1/devices/${deviceId}
		shadow.state,
		// Devices will send initial shadow without network info
		shadowNoNetworkInfo.state,
	]) {
		void it(`should validate message ${JSON.stringify(example)}`, () => {
			const result = validator(example as NRFCloudMessage | ipShadow)
			assert.equal('value' in result, true)
			assert.notEqual('value' in result && result.value, null)
		})
	}
})

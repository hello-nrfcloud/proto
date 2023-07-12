import { validateWithTypeBox } from '../../validator/validateWithTypeBox.js'
import { HistoricalDataRequest } from './HistoricalDataRequest.js'
import { HistoricalDataResponse } from './HistoricalDataResponse.js'
import BATTERY_request from './examples/request/BATTERY.json' assert { type: 'json' }
import GAIN_request from './examples/request/GAIN.json' assert { type: 'json' }
import LOCATION_request from './examples/request/LOCATION.json' assert { type: 'json' }
import BATTERY_response from './examples/response/BATTERY.json' assert { type: 'json' }
import GAIN_response from './examples/response/GAIN.json' assert { type: 'json' }
import LOCATION_response from './examples/response/LOCATION.json' assert { type: 'json' }

describe('Historical data request example messages', () => {
	const validator = validateWithTypeBox(HistoricalDataRequest)

	it.each([GAIN_request, BATTERY_request, LOCATION_request])(
		'should validate message %j',
		(example) => {
			const result = validator(example)
			expect(result).not.toHaveProperty('errors')
		},
	)
})

describe('Historical data response example messages', () => {
	const validator = validateWithTypeBox(HistoricalDataResponse)

	it.each([GAIN_response, BATTERY_response, LOCATION_response])(
		'should validate message %j',
		(example) => {
			const result = validator(example)
			expect(result).not.toHaveProperty('errors')
		},
	)
})

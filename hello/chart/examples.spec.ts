import type { Static } from '@sinclair/typebox'
import { validPassthrough } from '../validPassthrough.js'
import type { HistoricalDataRequest } from './HistoricalDataRequest.js'
import type { HistoricalDataResponse } from './HistoricalDataResponse.js'
import BATTERY_request from './examples/request/BATTERY.json' assert { type: 'json' }
import GAIN_request from './examples/request/GAIN.json' assert { type: 'json' }
import LOCATION_request from './examples/request/LOCATION.json' assert { type: 'json' }
import BATTERY_response from './examples/response/BATTERY.json' assert { type: 'json' }
import GAIN_response from './examples/response/GAIN.json' assert { type: 'json' }
import LOCATION_response from './examples/response/LOCATION.json' assert { type: 'json' }

describe('Historical data request example messages', () => {
	it.each([GAIN_request, BATTERY_request, LOCATION_request])(
		'should validate message %j',
		(example) => {
			const result = validPassthrough(
				example as Static<typeof HistoricalDataRequest>,
				(_, error) => console.error(JSON.stringify(error)),
			)
			expect(result).not.toBeNull()
		},
	)
})

describe('Historical data response example messages', () => {
	it.each([GAIN_response, BATTERY_response, LOCATION_response])(
		'should validate message %j',
		(example) => {
			const result = validPassthrough(
				example as Static<typeof HistoricalDataResponse>,
				(_, error) => console.error(JSON.stringify(error)),
			)
			expect(result).not.toBeNull()
		},
	)
})

import { validateWithTypeBox } from '../../validator/validateWithTypeBox.js'
import { HistoricalDataRequest } from './HistoricalDataRequest.js'
import { HistoricalDataResponse } from './HistoricalDataResponse.js'
import BATTERY_request from './examples/request/BATTERY.json' assert { type: 'json' }
import GAIN_request from './examples/request/GAIN.json' assert { type: 'json' }
import LOCATION_request from './examples/request/LOCATION.json' assert { type: 'json' }
import BATTERY_response from './examples/response/BATTERY.json' assert { type: 'json' }
import GAIN_response from './examples/response/GAIN.json' assert { type: 'json' }
import LOCATION_response from './examples/response/LOCATION.json' assert { type: 'json' }
import locationTrailRequest from './examples/request/locationTrail.json' assert { type: 'json' }
import locationTrailResponse from './examples/response/locationTrail.json' assert { type: 'json' }

import { describe, test as it } from 'node:test'
import assert from 'node:assert/strict'

void describe('Historical data request example messages', () => {
	const validator = validateWithTypeBox(HistoricalDataRequest)

	for (const example of [
		GAIN_request,
		BATTERY_request,
		LOCATION_request,
		locationTrailRequest,
	]) {
		void it(`should validate message ${JSON.stringify(example)}`, () => {
			const result = validator(example)
			assert.equal('errors' in result, false)
		})
	}
})

void describe('Historical data response example messages', () => {
	const validator = validateWithTypeBox(HistoricalDataResponse)

	for (const example of [
		GAIN_response,
		BATTERY_response,
		LOCATION_response,
		locationTrailResponse,
	]) {
		void it(`should validate message ${JSON.stringify(example)}`, () => {
			const result = validator(example)
			assert.equal('errors' in result, false)
		})
	}
})

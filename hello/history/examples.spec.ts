import { validateWithTypeBox } from '../../validator/validateWithTypeBox.js'
import {
	BatteryRequest,
	GainRequest,
	LocationRequest,
	LocationTrailRequest,
} from './HistoricalDataRequest.js'
import {
	BatteryResponse,
	GainResponse,
	LocationResponse,
	LocationTrailResponse,
} from './HistoricalDataResponse.js'
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
import type { TSchema } from '@sinclair/typebox'

void describe('historical data', () => {
	for (const [message, schema] of [
		[GAIN_request, GainRequest],
		[BATTERY_request, BatteryRequest],
		[LOCATION_request, LocationRequest],
		[locationTrailRequest, LocationTrailRequest],
		[GAIN_response, GainResponse],
		[BATTERY_response, BatteryResponse],
		[LOCATION_response, LocationResponse],
		[locationTrailResponse, LocationTrailResponse],
	] as [Record<string, any>, TSchema][]) {
		void it(`should validate message ${JSON.stringify(message)}`, () => {
			const validator = validateWithTypeBox(schema)
			const result = validator(message)
			assert.equal('errors' in result, false)
		})
	}
})

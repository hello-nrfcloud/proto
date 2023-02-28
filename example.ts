import { validPassthrough } from '@nrf.guide/proto'
import assert from 'node:assert/strict'

const isValid = validPassthrough({
	sender: 'nrf-350457794611739',
	topic: 'data/m/d/nrf-350457794611739/d2c',
	payload: {
		appId: 'TEMP',
		messageType: 'DATA',
		ts: 1676366336476,
		data: '25.73',
	},
})

const isInvalid = validPassthrough({
	temp: -42,
} as any)

assert.deepEqual(isValid, {
	sender: 'nrf-350457794611739',
	topic: 'data/m/d/nrf-350457794611739/d2c',
	payload: {
		appId: 'TEMP',
		messageType: 'DATA',
		ts: 1676366336476,
		data: '25.73',
	},
})
assert.equal(isInvalid, null)

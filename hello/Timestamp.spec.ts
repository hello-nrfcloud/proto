import type { Static } from '@sinclair/typebox'
import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { validateWithTypeBox } from 'validator/validateWithTypeBox.js'
import { Timestamp } from './Timestamp.js'

void describe('Timestamp', () => {
	void it('should validate', () => {
		const input: Static<typeof Timestamp> = '2024-04-19T08:30:00.000Z'
		const maybeValid = validateWithTypeBox(Timestamp)(input)
		assert.equal('errors' in maybeValid, false)
		assert.deepEqual('value' in maybeValid && maybeValid.value, input)
	})
})

import { IsoDateType } from './IsoDateType.js'
import { describe, test as it } from 'node:test'
import assert from 'node:assert/strict'
import { validateWithTypeBox } from 'validator/validateWithTypeBox.js'

void describe('isoDateRegExp', () => {
	void it('should match a date string', () => {
		const isoTs = new Date().toISOString()
		const maybeValid = validateWithTypeBox(IsoDateType())(isoTs)
		assert.equal('errors' in maybeValid, false)
		assert.equal('value' in maybeValid && maybeValid?.value, isoTs)
	})
})

import { isoDateRegExp } from './isoDateRegExp.js'
import { describe, test as it } from 'node:test'
import assert from 'node:assert/strict'

void describe('isoDateRegExp', () => {
	void it('should match a date string', () => {
		const isoTs = new Date().toISOString()
		assert.equal(isoDateRegExp.test(isoTs), true)
	})
})

import assert from 'node:assert/strict'
import { describe, test as it } from 'node:test'
import { isFingerprint } from './isFingerprint.js'

void describe('isFingerprint()', () => {
	void it('should validate a valid fingerprint', () =>
		assert.equal(isFingerprint('42.d3c4fb'), true))
	for (const invalidFingerprint of ['foo', '42.d3c4fbXX']) {
		void it(`should not validate invalid fingerprint ${invalidFingerprint}`, () =>
			assert.equal(isFingerprint(invalidFingerprint), false))
	}
})

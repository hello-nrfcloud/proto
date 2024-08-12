import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { fingerprintGenerator } from './fingerprintGenerator.js'
import { isFingerprint } from './isFingerprint.js'

void describe('fingerprintGenerator()', () => {
	void it('should generated a fingerprint', () => {
		const gen = fingerprintGenerator(666)
		const fp1 = gen()
		const fp2 = gen()
		assert.match(fp1, /^29a\./)
		assert.equal(isFingerprint(fp1), true)
		assert.notEqual(fp1, fp2)
	})
})

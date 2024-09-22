import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { validateWithTypeBox } from 'validator/validateWithTypeBox.js'
import { UpgradePath } from './FOTAJob.js'

const v = validateWithTypeBox(UpgradePath)

void describe('UpgradePath', () => {
	void it('should accept an upgrade path with plain versions', () =>
		assert.equal(
			hasError(
				v({
					'2.0.0': 'APP*1e29dfa3*v2.0.1',
					'2.0.1': 'APP*cd5412d9*v2.0.2',
				}),
			),
			false,
		))

	void describe('support semver ranges', () => {
		for (const range of [
			'<', // Less than
			'<=', // Less than or equal to
			'>', // Greater than
			'>=', // Greater than or equal to
		]) {
			void it(range, () =>
				assert.equal(
					hasError(
						v({
							[`${range}2.0.0`]: 'APP*1e29dfa3*v2.0.1',
						}),
					),
					false,
				),
			)
		}
	})

	void describe('reject invalid upgrade paths', () => {
		void it('should reject an upgrade path with an invalid version', () =>
			assert.equal(hasError(v({ foo: 'bar' } as any)), true))
	})
})

const hasError = (result: ReturnType<typeof v>) => 'errors' in result

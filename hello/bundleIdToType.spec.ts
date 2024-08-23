import assert from 'node:assert/strict'
import { describe, test as it } from 'node:test'
import { bundleIdToType } from './bundleIdToType.js'
import { FOTAJobTarget } from './FOTAJob.js'

void describe('bundleIdToType()', () => {
	void it('should return application for APP bundleId', () => {
		assert.equal(
			bundleIdToType('APP*27155a8a*v2.0.0-preview37-debug'),
			FOTAJobTarget.application,
		)
		assert.equal(
			bundleIdToType('MODEM*2e724a42*mfw_nrf9160_1.3.4'),
			FOTAJobTarget.modem,
		)
		assert.equal(
			bundleIdToType('MDM_FULL*132full1*mfw_nrf9160_full_1.3.2'),
			FOTAJobTarget.modem,
		)
		assert.equal(bundleIdToType('BOOT*custom'), null)
	})
})

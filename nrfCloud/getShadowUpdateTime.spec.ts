import shadow from './examples/shadow.json'
import { getShadowUpdateTime } from './getShadowUpdateTime.js'
import { describe, test as it } from 'node:test'
import assert from 'node:assert/strict'

void describe('getShadowUpdateTime()', () => {
	void it('should return the latest timestamp, when a shadow document was updated', () =>
		assert.equal(getShadowUpdateTime(shadow.state.metadata), 1682072423))
})

import shadow from './examples/shadow.json'
import { getShadowUpdateTime } from './getShadowUpdateTime.js'

describe('getShadowUpdateTime()', () => {
	it('should return the latest timestamp, when a shadow document was updated', () =>
		expect(getShadowUpdateTime(shadow.state.metadata)).toEqual(1682072423))
})

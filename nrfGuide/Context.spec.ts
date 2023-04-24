import { randomUUID } from 'node:crypto'
import { Context } from './Context.js'

const transformerId = randomUUID()
describe('Context', () => {
	it('should generate a deviceIdentity context URL', () =>
		expect(Context.deviceIdentity).toMatchObject(
			new URL(`https://github.com/bifravst/nRF-Guide-proto/deviceIdentity`),
		))
	it('should generate a transformed context URL', () =>
		expect(
			Context.model('PCA20035+solar').transformed(transformerId),
		).toMatchObject(
			new URL(
				`https://github.com/bifravst/nRF-Guide-proto/transformed/PCA20035%2Bsolar/${transformerId}`,
			),
		))
})

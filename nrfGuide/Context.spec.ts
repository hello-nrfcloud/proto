import { randomUUID } from 'node:crypto'
import { transformed } from './Context.js'

const transformerId = randomUUID()
describe('transformed()', () => {
	it('should generate a context URL', () =>
		expect(
			transformed({
				model: 'PCA20035+solar',
				transformerId,
			}),
		).toMatchObject(
			new URL(
				`https://github.com/bifravst/nRF-Guide-proto/transformed/PCA20035%2Bsolar/${transformerId}`,
			),
		))
})

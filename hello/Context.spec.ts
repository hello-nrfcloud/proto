import { randomUUID } from 'node:crypto'
import { Context } from './Context.js'

const transformerId = randomUUID()
describe('Context', () => {
	it('should generate a deviceIdentity context URL', () =>
		expect(Context.deviceIdentity).toMatchObject(
			new URL(`https://github.com/hello-nrfcloud/proto/deviceIdentity`),
		))
	it('should generate a transformed context URL', () =>
		expect(
			Context.model('PCA20035+solar').transformed(transformerId),
		).toMatchObject(
			new URL(
				`https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/${transformerId}`,
			),
		))
	it('should generate a problemDetail context URL', () =>
		expect(Context.problemDetail).toMatchObject(
			new URL(`https://github.com/hello-nrfcloud/proto/ProblemDetail`),
		))
	it('should generate a error context URL', () =>
		expect(Context.error('NotFound')).toMatchObject(
			new URL(`https://github.com/hello-nrfcloud/proto/error/NotFound`),
		))
})

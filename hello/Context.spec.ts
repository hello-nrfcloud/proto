import { randomUUID } from 'node:crypto'
import { Context } from './Context.js'
import { describe, test as it } from 'node:test'
import assert from 'node:assert/strict'

const transformerId = randomUUID()
void describe('Context', () => {
	void it('should generate a deviceIdentity context URL', () =>
		assert.deepEqual(
			Context.deviceIdentity,
			new URL(`https://github.com/hello-nrfcloud/proto/deviceIdentity`),
		))
	void it('should generate a transformed context URL', () =>
		assert.deepEqual(
			Context.model('PCA20035+solar').transformed(transformerId),
			new URL(
				`https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/${transformerId}`,
			),
		))
	void it('should generate a problemDetail context URL', () =>
		assert.deepEqual(
			Context.problemDetail,
			new URL(
				`https://github.com/hello-nrfcloud/proto/blob/saga/hello/errors/ProblemDetail.ts`,
			),
		))
	void it('should generate a error context URL', () =>
		assert.deepEqual(
			Context.error('NotFound'),
			new URL(`https://hello.nrfcloud.com/errors/NotFound`),
		))
	void it('should generate a historical data request context URL', () =>
		assert.deepEqual(
			Context.historicalDataRequest,
			new URL(
				`https://github.com/hello-nrfcloud/proto/historical-data-request`,
			),
		))
	void it('should generate a historical data response context URL', () =>
		assert.deepEqual(
			Context.historicalDataResponse,
			new URL(
				`https://github.com/hello-nrfcloud/proto/historical-data-response`,
			),
		))
})

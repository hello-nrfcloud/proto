import assert from 'node:assert/strict'
import { describe, test as it } from 'node:test'
import { Context } from './Context.js'

void describe('Context', () => {
	void it('should generate a deviceIdentity context URL', () =>
		assert.deepEqual(
			Context.deviceIdentity,
			new URL(`https://github.com/hello-nrfcloud/proto/deviceIdentity`),
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

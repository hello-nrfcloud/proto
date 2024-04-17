import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import nock from 'nock'
import { typedFetch, type TypedFetchResponse } from './typedFetch.js'
import { Type, type Static } from '@sinclair/typebox'
import { Context } from './Context.js'
import type { ProblemDetail } from './errors/ProblemDetail.js'

void describe('typedFetch()', () => {
	void it('should validate a response', async () => {
		const response = JSON.stringify({
			success: true,
		})
		const scope = nock('https://api.example.com')
			.get('/data')
			.reply(200, response, {
				'content-type': 'application/json; charset=utf-8',
				'content-length': `${response.length}`,
			})

		const getData = typedFetch({
			responseBodySchema: Type.Object({
				success: Type.Boolean(),
			}),
		})

		const res = await getData(new URL('https://api.example.com/data'))

		assert.equal(scope.isDone(), true)
		assert.equal('error' in res, false)
		assert.deepEqual('result' in res && res.result, { success: true })
	})

	void it('should fail if the response fails', async () => {
		const scope = nock('https://api.example.com')
			.get('/data')
			.reply(404, 'Not found', {
				'content-type': 'application/text; charset=utf-8',
				'content-length': `9`,
			})
		const getData = typedFetch({
			responseBodySchema: Type.Object({
				success: Type.Boolean(),
			}),
		})

		const res = await getData(new URL('https://api.example.com/data'))

		assert.equal(scope.isDone(), true)
		assertProblem({
			res,
			expectedTitle: 'Request failed (404)',
			expectedErrorDetailBody: 'Not found',
		})
	})

	void it('should fail if a JSON response is invalid', async () => {
		const response = JSON.stringify({
			invalid: 'data',
		})
		const scope = nock('https://api.example.com')
			.get('/data')
			.reply(200, response, {
				'content-type': 'application/json; charset=utf-8',
				'content-length': `${response.length}`,
			})

		const getData = typedFetch({
			responseBodySchema: Type.Object({
				success: Type.Boolean(),
			}),
		})

		const res = await getData(new URL('https://api.example.com/data'))

		assert.equal(scope.isDone(), true)
		assertProblem({
			res,
			expectedTitle: 'Response body validation failed',
			expectedErrorDetailBody: {
				invalid: 'data',
			},
			requireErrorsArray: true,
		})
	})

	void it('should fail if a non-JSON response is invalid', async () => {
		const response = 'foo'
		const scope = nock('https://api.example.com')
			.get('/data')
			.reply(200, response, {
				'content-type': 'application/text; charset=utf-8',
				'content-length': `${response.length}`,
			})

		const getData = typedFetch({
			responseBodySchema: Type.Literal('bar'),
		})

		const res = await getData(new URL('https://api.example.com/data'))

		assert.equal(scope.isDone(), true)
		assertProblem({
			res,
			expectedTitle: 'Response body validation failed',
			expectedErrorDetailBody: response,
			requireErrorsArray: true,
		})
	})

	void it('should fail if the request body validation fails', async () => {
		const postData = typedFetch({
			requestBodySchema: Type.Object({
				foo: Type.Literal('bar'),
			}),
			responseBodySchema: Type.Object({
				success: Type.Boolean(),
			}),
		})

		const res = await postData(
			new URL('https://api.example.com/data'),
			{ bar: 'baz' } as any,
			{ method: 'POST' },
		)
		assertProblem({
			res,
			expectedTitle: 'Request body validation failed',
			expectedErrorDetailBody: { bar: 'baz' },
			requireErrorsArray: true,
		})
	})
})

const assertProblem = ({
	res,
	expectedTitle,
	expectedErrorDetailBody,
	requireErrorsArray,
}: {
	res: TypedFetchResponse<any>
	expectedTitle: string
	expectedErrorDetailBody?: any
	requireErrorsArray?: true
}) => {
	assert.equal('error' in res, true, 'The request should have failed.')
	const {
		'@context': context,
		title,
		detail: detailJSON,
	} = (res as { error: Static<typeof ProblemDetail> }).error
	assert.equal(context, Context.problemDetail.toString())
	assert.equal(title, expectedTitle)
	const detail = JSON.parse(detailJSON!)
	if (expectedErrorDetailBody !== undefined)
		assert.deepEqual(
			detail.body,
			expectedErrorDetailBody,
			'The body should be included in the error detail.',
		)
	if (requireErrorsArray)
		assert.equal(
			Array.isArray(detail.errors),
			true,
			'The errors should be included the error detail.',
		)
}

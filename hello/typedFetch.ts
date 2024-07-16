import { type Static, type TObject, type TSchema } from '@sinclair/typebox'
import { validateWithTypeBox } from '@hello.nrfcloud.com/proto'
import type { ProblemDetail } from '@hello.nrfcloud.com/proto/hello'
import { Context } from '@hello.nrfcloud.com/proto/hello'

export type TypedFetchResponse<ResponseBodySchemaType extends TSchema> =
	| {
			error: Static<typeof ProblemDetail>
	  }
	| { result: Static<ResponseBodySchemaType> }

export const typedFetch = <
	ResponseBodySchemaType extends TSchema,
	RequestBodySchema extends TObject,
>({
	responseBodySchema,
	requestBodySchema,
	fetchImplementation,
}: {
	responseBodySchema: ResponseBodySchemaType
	requestBodySchema?: RequestBodySchema
	fetchImplementation?: typeof fetch
}): ((
	url: URL,
	body?: Static<RequestBodySchema>,
	init?: Omit<RequestInit, 'body'>,
) => Promise<TypedFetchResponse<ResponseBodySchemaType>>) => {
	const validateResponseBody = validateWithTypeBox(responseBodySchema)
	const validateRequestBody =
		requestBodySchema !== undefined
			? validateWithTypeBox(requestBodySchema)
			: undefined

	return async (url, body, init) => {
		if (body !== undefined && validateRequestBody !== undefined) {
			const maybeValidRequestBody = validateRequestBody(body)
			if ('errors' in maybeValidRequestBody) {
				return {
					error: {
						'@context': Context.problemDetail.toString(),
						title: 'Request body validation failed',
						detail: JSON.stringify({
							body,
							errors: maybeValidRequestBody.errors,
						}),
					},
				}
			}
		}
		let res: Response | undefined = undefined
		try {
			res = await (fetchImplementation ?? fetch)(url, {
				...(init ?? {}),
				body: body !== undefined ? JSON.stringify(body) : undefined,
			})
		} catch (err) {
			return {
				error: {
					'@context': Context.problemDetail.toString(),
					title: (err as Error).message,
				},
			}
		}

		const hasContent =
			parseInt(res.headers.get('content-length') ?? '0', 10) > 0
		if (!res.ok) {
			return {
				error: {
					'@context': Context.problemDetail.toString(),
					title: `Request failed (${res.status})`,
					detail: JSON.stringify({
						body: hasContent ? await res.text() : undefined,
					}),
				},
			}
		}
		let responseBody = undefined
		if (hasContent) {
			responseBody = await res.text()
			const isJSON =
				res.headers.get('content-type')?.includes('application/json') ?? false
			if (isJSON) {
				try {
					responseBody = JSON.parse(responseBody)
				} catch {
					return {
						error: {
							'@context': Context.problemDetail.toString(),
							title: `Failed to parse response as JSON!`,
							detail: JSON.stringify({
								body: responseBody,
							}),
						},
					}
				}
			}
		}
		const maybeValidResponseBody = validateResponseBody(responseBody)
		if ('errors' in maybeValidResponseBody) {
			return {
				error: {
					'@context': Context.problemDetail.toString(),
					title: 'Response body validation failed',
					detail: JSON.stringify({
						body: responseBody,
						errors: maybeValidResponseBody.errors,
					}),
				},
			}
		}
		return {
			result: responseBody,
		}
	}
}

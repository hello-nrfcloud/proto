import { Type, type Static } from '@sinclair/typebox'
import { Context } from '../Context.js'
import { HttpStatusCode, StatusCode } from './StatusCode.js'

/**
 * Problem Details Object
 *
 * @see https://datatracker.ietf.org/doc/draft-ietf-httpapi-rfc7807bis/
 */
export const ProblemDetail = Type.Object({
	'@context': Type.Literal(Context.problemDetail.toString()),
	'@id': Type.Optional(Type.String()),
	type: Type.String(),
	status: StatusCode,
	title: Type.String(),
	detail: Type.Optional(Type.String()),
})

export const BadRequestError = ({
	id,
	title,
	detail,
}: {
	id?: string
	title: string
	detail?: string
}): Static<typeof ProblemDetail> => ({
	'@context': Context.problemDetail.toString(),
	'@id': id,
	type: Context.error('BadRequest').toString(),
	status: HttpStatusCode.BAD_REQUEST,
	title,
	detail,
})

export const ConflictError = ({
	id,
	title,
	detail,
}: {
	id?: string
	title: string
	detail?: string
}): Static<typeof ProblemDetail> => ({
	'@context': Context.problemDetail.toString(),
	'@id': id,
	type: Context.error('Conflict').toString(),
	status: HttpStatusCode.CONFLICT,
	title,
	detail,
})

export const InternalError = ({
	id,
	title,
	detail,
}: {
	id?: string
	title?: string
	detail?: string
}): Static<typeof ProblemDetail> => ({
	'@context': Context.problemDetail.toString(),
	'@id': id,
	type: Context.error('InternalError').toString(),
	status: HttpStatusCode.INTERNAL_SERVER_ERROR,
	title: title ?? 'An internal error occurred.',
	detail,
})

export const NotFoundError = ({
	id,
	title,
	detail,
}: {
	id?: string
	title: string
	detail?: string
}): Static<typeof ProblemDetail> => ({
	'@context': Context.problemDetail.toString(),
	'@id': id,
	type: Context.error('NotFound').toString(),
	status: HttpStatusCode.NOT_FOUND,
	title,
	detail,
})

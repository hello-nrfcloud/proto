import type { Static } from '@sinclair/typebox'
import type { ErrorObject } from 'ajv'
import type { HelloMessage } from './HelloMessage.js'
import { HistoricalDataRequest } from './chart/HistoricalDataRequest.js'
import { HistoricalDataResponse } from './chart/HistoricalDataResponse.js'
import { ProblemDetail } from './errors/ProblemDetail.js'
import { validator } from './validator.js'

export const validPassthrough = (
	v: unknown,
	onDropped?: (v: unknown, errors: ErrorObject[]) => unknown,
):
	| Static<typeof HelloMessage>
	| Static<typeof HistoricalDataRequest>
	| Static<typeof HistoricalDataResponse>
	| Static<typeof ProblemDetail>
	| null => {
	const isValid = validator(v)
	if ('errors' in isValid) {
		onDropped?.(v, isValid.errors)
		return null
	}
	return isValid.value
}

import { Type } from '@sinclair/typebox'
import { validateWithTypeBox } from '../validator/validateWithTypeBox.js'
import { HelloMessage } from './HelloMessage.js'
import { HistoricalDataRequest } from './chart/HistoricalDataRequest.js'
import { HistoricalDataResponse } from './chart/HistoricalDataResponse.js'
import { ProblemDetail } from './errors/ProblemDetail.js'

export const validator = validateWithTypeBox(
	Type.Union([
		HelloMessage,
		HistoricalDataRequest,
		HistoricalDataResponse,
		ProblemDetail,
	]),
)

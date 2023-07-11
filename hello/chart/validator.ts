import { Type } from '@sinclair/typebox'
import { validateWithTypeBox } from '../../validator/validateWithTypeBox.js'
import { HistoricalDataRequest } from './HistoricalDataRequest.js'
import { HistoricalDataResponse } from './HistoricalDataResponse.js'

export const validator = validateWithTypeBox(
	Type.Union([HistoricalDataRequest, HistoricalDataResponse]),
)

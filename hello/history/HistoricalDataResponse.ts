import { Type } from '@sinclair/typebox'
import {
	BatteryData,
	GainData,
	LocationData,
	LocationTrailData,
} from './HistoricalData.js'
import { Context } from '../Context.js'
import { TimeSpan } from './TimeSpan.js'
import { HistoricalDataRequestMessageType } from './HistoricalDataRequest.js'

export const BatteryResponse = Type.Record(
	Type.String(),
	Type.Array(BatteryData),
)

export const GainResponse = Type.Record(Type.String(), Type.Array(GainData))

export const LocationResponse = Type.Array(LocationData)
export const LocationTrailResponse = Type.Array(LocationTrailData)

/**
 * Defines the historical data response
 */
export const HistoricalDataResponse = Type.Object({
	'@context': Type.Literal(Context.historicalDataResponse.toString()),
	'@id': Type.Optional(Type.String()),
	attributes: Type.Union([
		GainResponse,
		BatteryResponse,
		LocationResponse,
		LocationTrailResponse,
	]),
	type: TimeSpan,
	message: HistoricalDataRequestMessageType,
})

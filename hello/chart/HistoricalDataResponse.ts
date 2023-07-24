import { Type } from '@sinclair/typebox'
import { BatteryData, GainData, LocationData } from './HistoricalData.js'
import { Context } from '../Context.js'
import { ChartType } from './Type.js'
import { HistoricalDataRequestMessageType } from './HistoricalDataRequest.js'

export const BatteryResponse = Type.Record(
	Type.String(),
	Type.Array(BatteryData),
)

export const GainResponse = Type.Record(Type.String(), Type.Array(GainData))

export const LocationResponse = Type.Array(LocationData)

/**
 * Defines the historical data response
 */
export const HistoricalDataResponse = Type.Object({
	'@context': Type.Literal(Context.historicalDataResponse.toString()),
	'@id': Type.Optional(Type.String()),
	attributes: Type.Union([GainResponse, BatteryResponse, LocationResponse]),
	type: ChartType,
	message: HistoricalDataRequestMessageType,
})

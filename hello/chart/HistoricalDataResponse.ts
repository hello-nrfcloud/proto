import { Type } from '@sinclair/typebox'
import { BatteryData, GainData, LocationData } from './HistoricalData.js'
import { Context } from '../Context.js'

const BatteryResponse = Type.Record(Type.String(), Type.Array(BatteryData))

const GainResponse = Type.Record(Type.String(), Type.Array(GainData))

const LocationResponse = Type.Array(LocationData)

/**
 * Defines the historical data response
 */
export const HistoricalDataResponse = Type.Object({
	'@context': Type.Literal(Context.historicalDataResponse.toString()),
	'@id': Type.String(),
	attributes: Type.Union([GainResponse, BatteryResponse, LocationResponse]),
})

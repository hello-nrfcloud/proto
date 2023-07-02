import { Type } from '@sinclair/typebox'
import { ts } from '../HelloMessage.js'
import { GainData, LocationData, VoltageData } from './HistoricalData.js'

const VoltageResponse = Type.Record(Type.String(), Type.Array(VoltageData))

const GainResponse = Type.Record(Type.String(), Type.Array(GainData))

const LocationResponse = Type.Array(LocationData)

/**
 * Defines the historical data response
 */
export const HistoricalDataResponse = Type.Object({
	'@context': Type.String(),
	'@id': Type.String(),
	attributes: Type.Union([GainResponse, VoltageResponse, LocationResponse]),
	ts,
})

import { Type, type Static } from '@sinclair/typebox'
import { GainData, LocationData, VoltageData } from './HistoricalData.js'

const VoltageResponse = Type.Record(Type.String(), Type.Array(VoltageData))

const GainResponse = Type.Record(Type.String(), Type.Array(GainData))

const LocationResponse = Type.Array(LocationData)

/**
 * Defines the historical data response
 */
export const HistoricalDataResponse = Type.Object({
	'@context': Type.Literal(
		'https://github.com/bifravst/Muninn-proto/historical-data',
	),
	'@id': Type.String(),
	attributes: Type.Union([GainResponse, VoltageResponse, LocationResponse]),
})

export type HistoricalDataResponseType = Static<typeof HistoricalDataResponse>

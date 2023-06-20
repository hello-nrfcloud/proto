import { Type, type Static } from '@sinclair/typebox'
import { MuninnChartTypes } from './ChartType.js'
import { GainData, LocationData, VoltageData } from './HistoricalData.js'

const Aggregate = Type.Union([
	Type.Literal('avg'),
	Type.Literal('min'),
	Type.Literal('max'),
	Type.Literal('sum'),
	Type.Literal('count'),
])

const GainRequest = Type.Object({
	message: Type.Literal('gain'),
	attributes: Type.Record(
		Type.String(),
		Type.Object({
			attribute: Type.Literal('mA'),
			aggregate: Aggregate,
		}),
	),
	data: Type.Record(Type.String(), Type.Array(GainData)),
})

const VoltageRequest = Type.Object({
	message: Type.Literal('voltage'),
	attributes: Type.Record(
		Type.String(),
		Type.Object({
			attribute: Type.Literal('v'),
			aggregate: Aggregate,
		}),
	),
	data: Type.Record(Type.String(), Type.Array(VoltageData)),
})

const LocationRequest = Type.Object({
	message: Type.Literal('location'),
	attributes: Type.Object({
		lat: Type.Object({ attribute: Type.Literal('lat') }),
		lng: Type.Object({ attribute: Type.Literal('lng') }),
		acc: Type.Object({ attribute: Type.Literal('acc') }),
	}),
	data: Type.Array(LocationData),
})

const CommonRequest = Type.Object({
	'@context': Type.Literal(
		'https://github.com/bifravst/Muninn-proto/historical-data-request',
	),
	'@id': Type.String(),
	type: Type.KeyOf(MuninnChartTypes),
})

/**
 * Defines the historical data request
 */
export const HistoricalDataRequest = Type.Union([
	Type.Composite([CommonRequest, GainRequest]),
	Type.Composite([CommonRequest, VoltageRequest]),
	Type.Composite([CommonRequest, LocationRequest]),
])

export type HistoricalDataRequestType = Static<typeof HistoricalDataRequest>

import { Type } from '@sinclair/typebox'
import { ChartType } from './Type.js'

const Aggregate = Type.Union([
	Type.Literal('avg', {
		description:
			'avg(x) function used in Timestream, https://docs.aws.amazon.com/timestream/latest/developerguide/aggregate-functions.html',
	}),
	Type.Literal('min', {
		description:
			'min(x) function used in Timestream, https://docs.aws.amazon.com/timestream/latest/developerguide/aggregate-functions.html',
	}),
	Type.Literal('max', {
		description:
			'max(x) function used in Timestream, https://docs.aws.amazon.com/timestream/latest/developerguide/aggregate-functions.html',
	}),
	Type.Literal('sum', {
		description:
			'sum(x) function used in Timestream, https://docs.aws.amazon.com/timestream/latest/developerguide/aggregate-functions.html',
	}),
	Type.Literal('count', {
		description:
			'count(x) function used in Timestream, https://docs.aws.amazon.com/timestream/latest/developerguide/aggregate-functions.html',
	}),
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
})

const BatteryRequest = Type.Object({
	message: Type.Literal('battery'),
	attributes: Type.Record(
		Type.String(),
		Type.Object({
			attribute: Type.Literal('%'),
			aggregate: Aggregate,
		}),
	),
})

const LocationRequest = Type.Object({
	message: Type.Literal('location'),
	attributes: Type.Object({
		lat: Type.Object({ attribute: Type.Literal('lat') }),
		lng: Type.Object({ attribute: Type.Literal('lng') }),
		acc: Type.Object({ attribute: Type.Literal('acc') }),
		ts: Type.Object({ attribute: Type.Literal('ts') }),
	}),
})

const CommonRequest = Type.Object({
	'@context': Type.Literal(
		'https://github.com/hello-nrfcloud/proto/historical-data-request',
	),
	'@id': Type.String(),
	type: ChartType,
})

/**
 * Defines the historical data request
 */
export const HistoricalDataRequest = Type.Union([
	Type.Composite([CommonRequest, GainRequest]),
	Type.Composite([CommonRequest, BatteryRequest]),
	Type.Composite([CommonRequest, LocationRequest]),
])

import { Type } from '@sinclair/typebox'
import { ChartType } from './Type.js'
import { Context } from '../Context.js'
import type { Thingy91WithSolarShieldMessages } from '../model/PCA20035+solar/proto.js'

type Thingy91SolarMessagesTypes = keyof typeof Thingy91WithSolarShieldMessages

const gainKey: Thingy91SolarMessagesTypes = 'gain'
const batteryKey: Thingy91SolarMessagesTypes = 'battery'
const locationKey: Thingy91SolarMessagesTypes = 'location'
export const gainMessage = Type.Literal(gainKey)
export const batteryMessage = Type.Literal(batteryKey)
export const locationMessage = Type.Literal(locationKey)

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
	message: gainMessage,
	attributes: Type.Record(
		Type.String(),
		Type.Object({
			attribute: Type.Literal('mA'),
			aggregate: Aggregate,
		}),
	),
})

const BatteryRequest = Type.Object({
	message: batteryMessage,
	attributes: Type.Record(
		Type.String(),
		Type.Object({
			attribute: Type.Literal('%'),
			aggregate: Aggregate,
		}),
	),
})

const LocationRequest = Type.Object({
	message: locationMessage,
	attributes: Type.Object({
		lat: Type.Object({ attribute: Type.Literal('lat') }),
		lng: Type.Object({ attribute: Type.Literal('lng') }),
		acc: Type.Object({ attribute: Type.Literal('acc') }),
		ts: Type.Object({ attribute: Type.Literal('ts') }),
	}),
})

const CommonRequest = Type.Object({
	'@context': Type.Literal(Context.historicalDataRequest.toString()),
	'@id': Type.Optional(Type.String()),
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

export const HistoricalDataRequestMessageType = Type.Union([
	gainMessage,
	batteryMessage,
	locationMessage,
])

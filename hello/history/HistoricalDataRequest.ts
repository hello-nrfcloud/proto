import { Type } from '@sinclair/typebox'
import { TimeSpan } from './TimeSpan.js'
import { Context } from '../Context.js'
import type { Thingy91WithSolarShieldMessages } from '../model/PCA20035+solar/proto.js'

type Thingy91SolarMessagesTypes = keyof typeof Thingy91WithSolarShieldMessages

export const gainKey: Thingy91SolarMessagesTypes = 'gain'
export const batteryKey: Thingy91SolarMessagesTypes = 'battery'
export const locationKey: Thingy91SolarMessagesTypes = 'location'
export const gainMessage = Type.Literal(gainKey)
export const batteryMessage = Type.Literal(batteryKey)
export const locationMessage = Type.Literal(locationKey)
export const locationTrailMessage = Type.Literal('locationTrail')

export const Aggregate = Type.Union([
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

export const GainRequest = Type.Object({
	message: gainMessage,
	attributes: Type.Record(
		Type.String(),
		Type.Object({
			attribute: Type.Literal('mA'),
			aggregate: Aggregate,
		}),
	),
})

export const BatteryRequest = Type.Object({
	message: batteryMessage,
	attributes: Type.Record(
		Type.String(),
		Type.Object({
			attribute: Type.Literal('%'),
			aggregate: Aggregate,
		}),
	),
})

export const LocationRequest = Type.Object({
	message: locationMessage,
	attributes: Type.Object({
		lat: Type.Object({ attribute: Type.Literal('lat') }),
		lng: Type.Object({ attribute: Type.Literal('lng') }),
		acc: Type.Object({ attribute: Type.Literal('acc') }),
		ts: Type.Object({ attribute: Type.Literal('ts') }),
	}),
})

export const LocationTrailRequest = Type.Object({
	message: locationTrailMessage,
	minDistanceKm: Type.Number({
		minimum: 0,
		description:
			'The minimum distance in KM for a location to not be folded into the current position.',
	}),
	attributes: Type.Object({
		lat: Type.Object({ attribute: Type.Literal('lat') }),
		lng: Type.Object({ attribute: Type.Literal('lng') }),
		count: Type.Object({ attribute: Type.Literal('count') }),
		radiusKm: Type.Object({ attribute: Type.Literal('radiusKm') }),
		ts: Type.Object({ attribute: Type.Literal('ts') }),
	}),
})

export const CommonRequest = Type.Object({
	'@context': Type.Literal(Context.historicalDataRequest.toString()),
	'@id': Type.Optional(Type.String()),
	type: TimeSpan,
})

/**
 * Defines the historical data request
 */
export const HistoricalDataRequest = Type.Union([
	Type.Composite([CommonRequest, GainRequest]),
	Type.Composite([CommonRequest, BatteryRequest]),
	Type.Composite([CommonRequest, LocationRequest]),
	Type.Composite([CommonRequest, LocationTrailRequest]),
])

export const HistoricalDataRequestMessageType = Type.Union([
	gainMessage,
	batteryMessage,
	locationMessage,
	locationTrailMessage,
])

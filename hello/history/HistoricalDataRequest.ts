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

export const CommonRequest = Type.Object({
	'@context': Type.Literal(Context.historicalDataRequest.toString()),
	'@id': Type.Optional(Type.String()),
	type: TimeSpan,
	message: Type.String({ minLength: 1 }),
	filter: Type.Optional(
		Type.Record(
			Type.String({
				minLength: 1,
				description: 'The name of the attribute to apply the filter on',
			}),
			Type.Partial(
				Type.Record(
					Type.Union(
						[
							'<', // Less than
							'>', // Greater than
							'<=', // Less than or equal to
							'>=', // Greater than or equal to
							'=', // Equal
							'<>', // Not equal
							'!=', // Not equal
						].map((s) => Type.Literal(s)),
						{
							description:
								'See https://docs.aws.amazon.com/timestream/latest/developerguide/comparison-operators.html',
						},
					),
					Type.Union([Type.String(), Type.Boolean(), Type.Number()]),
				),
			),
		),
	),
})

export const GainRequest = Type.Composite([
	CommonRequest,
	Type.Object({
		message: gainMessage,
		attributes: Type.Record(
			Type.String(),
			Type.Object({
				attribute: Type.Literal('mA'),
				aggregate: Aggregate,
			}),
		),
	}),
])

export const BatteryRequest = Type.Composite([
	CommonRequest,
	Type.Object({
		message: batteryMessage,
		attributes: Type.Record(
			Type.String(),
			Type.Object({
				attribute: Type.Literal('%'),
				aggregate: Aggregate,
			}),
		),
	}),
])

export const LocationRequest = Type.Composite([
	CommonRequest,
	Type.Object({
		message: locationMessage,
		attributes: Type.Object({
			lat: Type.Object({ attribute: Type.Literal('lat') }),
			lng: Type.Object({ attribute: Type.Literal('lng') }),
			acc: Type.Object({ attribute: Type.Literal('acc') }),
			ts: Type.Object({ attribute: Type.Literal('ts') }),
		}),
	}),
])

export const LocationTrailRequest = Type.Composite([
	CommonRequest,
	Type.Object({
		message: locationTrailMessage,
		minDistanceKm: Type.Number({
			minimum: 0,
			description:
				'The minimum distance in KM for a location to not be folded into the current position.',
		}),
	}),
])

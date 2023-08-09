import { Type } from '@sinclair/typebox'
import {
	BatteryData,
	GainData,
	LocationData,
	LocationTrailData,
} from './HistoricalData.js'
import { Context } from '../Context.js'
import { TimeSpan } from './TimeSpan.js'
import {
	batteryMessage,
	gainMessage,
	locationMessage,
	locationTrailMessage,
} from './HistoricalDataRequest.js'

export const CommonResponse = Type.Object({
	'@context': Type.Literal(Context.historicalDataResponse.toString()),
	'@id': Type.Optional(Type.String()),
	message: Type.String({ minLength: 1 }),
	type: TimeSpan,
})

export const BatteryResponse = Type.Composite([
	CommonResponse,
	Type.Object({
		message: batteryMessage,
		attributes: Type.Record(Type.String(), Type.Array(BatteryData)),
	}),
])

export const GainResponse = Type.Composite([
	CommonResponse,
	Type.Object({
		message: gainMessage,
		attributes: Type.Record(Type.String(), Type.Array(GainData)),
	}),
])

export const LocationResponse = Type.Composite([
	CommonResponse,
	Type.Object({
		message: locationMessage,
		attributes: Type.Array(LocationData),
	}),
])

export const LocationTrailResponse = Type.Composite([
	CommonResponse,
	Type.Object({
		attributes: Type.Array(LocationTrailData),
		message: locationTrailMessage,
	}),
])

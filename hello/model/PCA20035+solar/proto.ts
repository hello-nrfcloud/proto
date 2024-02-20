import type { Static } from '@sinclair/typebox'
import jsonata from 'jsonata'
import type { Thingy91WithSolarShieldMessage } from './message.js'
import { convert, type errorFn } from '../../convert.js'
import { Context } from '../../Context.js'
import { Model } from '../Model.js'

export const Thingy91WithSolarShieldMessages = {
	gain: [
		{
			filter: jsonata(`appId = 'SOLAR'`),
			transform: jsonata(`{ 'mA': $number(data) }`),
		},
	],
	battery: [
		{
			filter: jsonata(`appId = 'BATTERY'`),
			transform: jsonata(`{ '%': $number(data) }`),
		},
	],
	networkInfo: [
		{
			filter: jsonata(`appId = 'DEVICE' and $exists(data.networkInfo)`),
			transform: jsonata(`data.networkInfo`),
		},
	],
	deviceInfo: [
		{
			filter: jsonata(`appId = 'DEVICE' and $exists(data.deviceInfo)`),
			transform: jsonata(`data.deviceInfo`),
		},
	],
	rsrp: [
		{
			filter: jsonata(`appId = 'RSRP'`),
			transform: jsonata(`{ 'rsrp': $number(data) }`),
		},
	],
	airHumidity: [
		{
			filter: jsonata(`appId = 'HUMID'`),
			transform: jsonata(`{ 'p': $number(data) }`),
		},
	],
	airTemperature: [
		{
			filter: jsonata(`appId = 'TEMP'`),
			transform: jsonata(`{ 'c': $number(data) }`),
		},
	],
	airQuality: [
		{
			filter: jsonata(`appId = 'AIR_QUAL'`),
			transform: jsonata(`{ 'IAQ': $number(data) }`),
		},
	],
	airPressure: [
		{
			filter: jsonata(`appId = 'AIR_PRESS'`),
			transform: jsonata(`{ 'mbar': $number(data) * 10 }`),
		},
	],
	button: [
		{
			filter: jsonata(`appId = 'BUTTON'`),
			transform: jsonata(`{ 'id': $number(data) }`),
		},
	],
	location: [
		{
			filter: jsonata(
				`appId = 'GROUND_FIX' and $exists(data.lat) and $exists(data.lon) and $exists(data.uncertainty) and $exists(data.fulfilledWith)`,
			),
			transform: jsonata(`{
			"lat": data.lat,
			"lng": data.lon,
			"acc": data.uncertainty,
			"src": data.fulfilledWith
		}`),
		},
		{
			filter: jsonata(
				`\`@context\` = "${Context.singleCellGeoLocation.toString()}"`,
			),
			transform: jsonata(`{
			"lat": lat,
			"lng": lng,
			"acc": accuracy,
			"ts": ts,
			"src": "SCELL"
		}`),
		},
		{
			filter: jsonata(
				`appId = 'GNSS' and $exists(data.lat) and $exists(data.lng) and $exists(data.acc)`,
			),
			transform: jsonata(`{
			"lat": data.lat,
			"lng": data.lng,
			"acc": data.acc,
			"alt": data.alt,
			"spd": data.spd,
			"hdg": data.hdg,
			"ts": ts,
			"src": "GNSS"
		}`),
		},
	],
	reported: [
		{
			filter: jsonata(
				`$exists(version) and $exists(reported) and $exists(metadata)`,
			),
			transform: jsonata(`{
			'version': version,
			'config': reported.config,
			'device': {
				'deviceInfo': reported.device.deviceInfo,
				'simInfo': reported.device.simInfo,
				'networkInfo': reported.device.networkInfo
			},
			'connected': reported.connection.status = 'connected',
			'lastUpdate': {
				'device': {
					'networkInfo': {
						'networkMode': metadata.reported.device.networkInfo.networkMode.timestamp * 1000,
						'mccmnc': metadata.reported.device.networkInfo.mccmnc.timestamp * 1000,
						'eest': metadata.reported.device.networkInfo.eest.timestamp * 1000
					},
					'deviceInfo': {
						'appVersion': metadata.reported.device.deviceInfo.appVersion.timestamp * 1000
					}
				}
			}
		}`),
		},
	],
	desiredConfiguration: [
		{
			filter: jsonata(
				`$exists(version) and $exists(desired.config) and $exists(metadata)`,
			),
			transform: jsonata(`{
			'version': version,
			'config': desired.config
		}`),
		},
	],
} as const

/**
 * Defines converters for messages handled by hello.nrfcloud.com.
 */
export const proto =
	({ onError }: { onError?: errorFn } = {}) =>
	async (
		model: string,
		message: unknown,
	): Promise<Static<typeof Thingy91WithSolarShieldMessage>[]> => {
		const converted = await convert({
			getTransformExpressions: async (model: string) => {
				switch (model) {
					case Model.Thingy91WithSolarShield:
						return Promise.resolve(Thingy91WithSolarShieldMessages)
					default:
						return Promise.resolve({})
				}
			},
			onError,
		})(model)(message)

		return converted.map(({ ['@context']: context, ...rest }) => ({
			'@context': context.toString(),
			...rest,
		})) as Static<typeof Thingy91WithSolarShieldMessage>[]
	}

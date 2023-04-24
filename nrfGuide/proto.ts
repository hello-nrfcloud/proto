import type { Static } from '@sinclair/typebox'
import jsonata from 'jsonata'
import type { NRFGuideMessage } from './NRFGuideMessage.js'
import { convert, type errorFn } from './convert.js'

export enum Model {
	Thingy91WithSolarShield = 'PCA20035+solar',
}

/**
 * Defines converters for messages handled by nRF Guide.
 */
export const proto =
	({ onError }: { onError?: errorFn } = {}) =>
	async (
		model: string,
		message: unknown,
	): Promise<Static<typeof NRFGuideMessage>[]> => {
		const converted = await convert({
			getTransformExpressions: async (model: string) => {
				switch (model) {
					case Model.Thingy91WithSolarShield:
						return Promise.resolve({
							gain: {
								filter: jsonata(`appId = 'SOLAR'`),
								transform: jsonata(`{ 'mA': $number(data) }`),
							},
							voltage: {
								filter: jsonata(`appId = 'VOLTAGE'`),
								transform: jsonata(`{ 'v': $number(data)/1000 }`),
							},
							networkInfo: {
								filter: jsonata(
									`appId = 'DEVICE' and $exists(data.networkInfo)`,
								),
								transform: jsonata(`data.networkInfo`),
							},
							deviceInfo: {
								filter: jsonata(
									`appId = 'DEVICE' and $exists(data.deviceInfo)`,
								),
								transform: jsonata(`data.deviceInfo`),
							},
							rsrp: {
								filter: jsonata(`appId = 'RSRP'`),
								transform: jsonata(`{ 'rsrp': $number(data) }`),
							},
							airHumidity: {
								filter: jsonata(`appId = 'HUMID'`),
								transform: jsonata(`{ 'p': $number(data) }`),
							},
							airTemperature: {
								filter: jsonata(`appId = 'TEMP'`),
								transform: jsonata(`{ 'c': $number(data) }`),
							},
							airQuality: {
								filter: jsonata(`appId = 'AIR_QUAL'`),
								transform: jsonata(`{ 'IAQ': $number(data) }`),
							},
							airPressure: {
								filter: jsonata(`appId = 'AIR_PRESS'`),
								transform: jsonata(`{ 'kPa': $number(data) }`),
							},
							reported: {
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
									'connected': reported.connection.status = 'connected'
								}`),
							},
						})
					default:
						return Promise.resolve({})
				}
			},
			onError,
		})(model)(message)

		return converted.map(({ ['@context']: context, ...rest }) => ({
			'@context': context.toString(),
			...rest,
		})) as Static<typeof NRFGuideMessage>[]
	}

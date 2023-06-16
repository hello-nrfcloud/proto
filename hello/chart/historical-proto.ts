import jsonata from 'jsonata'
import { type errorFn } from '../convert.js'
import { Model } from '../proto.js'
import { type HistoricalDataResponseType } from './HistoricalDataResponse.js'
import { historicalConvert } from './convert.js'

/**
 * Defines converters for historical data handled by hello.nrfcloud.com
 */
export const historicalProto =
	({ onError }: { onError?: errorFn } = {}) =>
	async (
		model: string,
		message: unknown,
	): Promise<HistoricalDataResponseType[]> => {
		const converted = await historicalConvert({
			getTransformExpressions: async (model: string) => {
				switch (model) {
					case Model.Thingy91WithSolarShield:
						return Promise.resolve({
							gain: {
								filter: jsonata(`message = 'gain'`),
								transform: jsonata(`$merge(
									$each(attributes, function($v, $k) {
										{ $k: $lookup(data, $k) }
									})
								)`),
							},
							voltage: {
								filter: jsonata(`message = 'voltage'`),
								transform: jsonata(`$merge(
									$each(attributes, function($v, $k) {
										{ $k: $lookup(data, $k) }
									})
								)`),
							},
							location: {
								filter: jsonata(`message = 'location'`),
								transform: jsonata(`data`),
							},
						})
					default:
						return Promise.resolve({})
				}
			},
			onError,
		})(model)(message)

		return converted
	}

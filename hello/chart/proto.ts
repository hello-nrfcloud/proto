import jsonata from 'jsonata'
import { type errorFn } from '../convert.js'
import { Model } from '../proto.js'
import type { HistoricalDataResponseType } from './HistoricalDataResponse.js'
import { historicalConvert } from './convert.js'

/**
 * Defines converters for messages handled by hello.nrfcloud.com.
 */
export const chartProto =
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
							'historical-data': {
								filter: jsonata(`message in ['gain', 'voltage', 'location']`),
								transform: jsonata(`{ 'attributes': data }`),
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
		})) as HistoricalDataResponseType[]
	}

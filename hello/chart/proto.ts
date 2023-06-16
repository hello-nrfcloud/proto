import jsonata from 'jsonata'
import { type errorFn } from '../convert.js'
import type { HistoricalDataResponseType } from './HistoricalDataResponse.js'
import { historicalConvert } from './convert.js'

export enum Model {
	Thingy91WithSolarShield = 'PCA20035+solar',
}

/**
 * Defines converters for messages handled by hello.nrfcloud.com.
 */
export const proto =
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

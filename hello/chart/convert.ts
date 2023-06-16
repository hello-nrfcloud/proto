import { validateWithJSONSchema } from '../../validator/validateWithJSONSchema.js'
import { Context } from '../Context.js'
import { type errorFn, type evaluateFn } from '../convert.js'
import {
	HistoricalDataRequest,
	type HistoricalDataRequestType,
} from './HistoricalDataRequest.js'
import { type HistoricalDataResponseType } from './HistoricalDataResponse.js'

const validator = validateWithJSONSchema<HistoricalDataRequestType>(
	HistoricalDataRequest,
)

/**
 * Converts historical data request to the messages relevant for hello.nrfcloud.com using JSONata
 *
 * Conversion are applied per model, where model is for example a Thingy:91, a 9160DK, a Thingy:91 with a solar shield.
 *
 * All messages are checked against a filter expression. If no filter expression matches, the message is dropped.
 *
 * For any filter expression that matches, the associated transform expression will be applied.
 *
 * If no filter expression is associated, the message will be used as is.
 *
 * @see https://jsonata.org/
 */
export const historicalConvert =
	({
		getTransformExpressions,
		onError,
	}: {
		/**
		 * This map contains JSONata expression that are used to select a transform expression to be applied to a historical data request.
		 *
		 * This allows to provide a flexible, and in the future user-definable API to write per-device-model converters.
		 *
		 * It is injected here so it these expression can later come from a database.
		 */
		getTransformExpressions: (
			model: string,
		) => Promise<Record<string, { filter: evaluateFn; transform?: evaluateFn }>>
		onError?: errorFn
	}) =>
	(model: string) =>
	async (message: unknown): Promise<HistoricalDataResponseType[]> => {
		// Validate incoming message
		const isValid = validator(message)
		if ('errors' in isValid) {
			onError?.(
				message,
				model,
				`Not a historical data request.`,
				isValid.errors,
			)
			return []
		}

		// Find converter definitions for model
		const compiledModelExpressions = Object.entries(
			(await getTransformExpressions(model)) ?? {},
		).map(([transformerId, { filter, transform }]) => ({
			transformerId,
			filter,
			transform,
		}))

		// Nothing to process
		if (compiledModelExpressions.length === 0) {
			onError?.(message, model, `No expressions defined.`, [])
			return []
		}

		const request = isValid.value

		// Find all transformers, which filter expression evaluated to `true`
		const matchedTransformers = (
			await Promise.all(
				compiledModelExpressions.map(
					async ({ filter, transform, transformerId }) => ({
						matched: await filter.evaluate(request),
						transform,
						transformerId,
					}),
				),
			)
		).filter(({ matched }) => matched === true)

		const converted: HistoricalDataResponseType[] = []
		for (const { transform, transformerId } of matchedTransformers) {
			const context = Context.model(model).transformed(transformerId)
			if (transform === undefined) {
				continue
			}

			const transformed = await transform.evaluate(request)
			if (typeof transformed !== 'object') {
				continue
			}

			converted.push({
				['@context']: context.toString(),
				['@id']: request['@id'],
				attributes: transformed,
			})
		}

		return converted
	}

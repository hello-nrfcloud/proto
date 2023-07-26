import type { ErrorObject } from 'ajv'
import jsonata from 'jsonata'
import { getShadowUpdateTime } from '../nrfCloud/getShadowUpdateTime.js'
import type { ipShadow } from '../nrfCloud/types/types.js'
import { validator as validateNrfCloudMessage } from '../nrfCloud/validator.js'
import { Context } from './Context.js'
import { incomingMessageValidator as validateBackendMessage } from './incomingMessageValidator.js'

export type ConvertedMessage = {
	['@context']: URL
	ts: number
	[key: string]: any
}
export type evaluateFn = ReturnType<typeof jsonata>
export type errorFn = (
	message: unknown,
	model: string,
	error: string,
	validationErrors: ErrorObject[],
) => unknown

/**
 * Provides a filter to select messages that should be considered, and an optional transform expression to be applied to the message.
 */
export type MessageProcessor = { filter: evaluateFn; transform?: evaluateFn }

/**
 * A map that defines messages for a device
 */
export type MessageDefinition = Record<string, MessageProcessor>

/**
 * Converts incoming messages from nRF Cloud to the messages relevant for hello.nrfcloud.com using JSONata
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
export const convert =
	({
		getTransformExpressions,
		onError,
	}: {
		/**
		 * This map contains JSONata expression that are used to select a transform expression to be applied to a nRF Cloud Message.
		 *
		 * This allows to provide a flexible, and in the future user-definable API to write per-device-model converters.
		 *
		 * It is injected here so it these expression can later come from a database.
		 */
		getTransformExpressions: (model: string) => Promise<MessageDefinition>
		onError?: errorFn
	}) =>
	(model: string) =>
	async (message: unknown): Promise<ConvertedMessage[]> => {
		let validMessage: Record<string, any> | undefined = undefined

		// Validate as backend message
		const maybeIsValidBackendMessage =
			typeof message === 'object' && message !== null && '@context' in message
				? validateBackendMessage(message)
				: undefined
		if (
			maybeIsValidBackendMessage !== undefined &&
			'value' in maybeIsValidBackendMessage
		) {
			validMessage = maybeIsValidBackendMessage.value
		}
		console.log(maybeIsValidBackendMessage)

		// Validate as nRF Cloud message
		const maybeIsValidNrfCloudMessage =
			validMessage === undefined ? validateNrfCloudMessage(message) : undefined
		if (
			maybeIsValidNrfCloudMessage !== undefined &&
			'value' in maybeIsValidNrfCloudMessage
		) {
			validMessage = maybeIsValidNrfCloudMessage.value
		}

		if (validMessage === undefined) {
			const errors: ErrorObject[] = []
			if (
				maybeIsValidBackendMessage !== undefined &&
				'errors' in maybeIsValidBackendMessage
			)
				errors.push(...maybeIsValidBackendMessage.errors)
			if (
				maybeIsValidNrfCloudMessage !== undefined &&
				'errors' in maybeIsValidNrfCloudMessage
			)
				errors.push(...maybeIsValidNrfCloudMessage.errors)
			onError?.(message, model, `Not a valid message.`, errors)
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

		// Some nRF Cloud message formats do not specify a timestamp (e.g. Wi-Fi site survey)
		let ts =
			'ts' in validMessage && validMessage.ts !== undefined
				? validMessage.ts
				: Date.now()

		if ('metadata' in validMessage) {
			ts =
				getShadowUpdateTime(
					(validMessage as unknown as ipShadow).metadata ?? {},
				) * 1000
		}

		// Find all transformers, which filter expression evaluated to `true`
		const matchedTransformers = (
			await Promise.all(
				compiledModelExpressions.map(
					async ({ filter, transform, transformerId }) => ({
						matched: await filter.evaluate(validMessage),
						transform,
						transformerId,
					}),
				),
			)
		).filter(({ matched }) => matched === true)

		const converted: ConvertedMessage[] = []
		for (const { transform, transformerId } of matchedTransformers) {
			const context = Context.model(model).transformed(transformerId)
			if (transform === undefined) {
				converted.push({
					...validMessage,
					['@context']: context,
					ts,
				})
				continue
			}
			const transformed = await transform.evaluate(validMessage)
			if (typeof transformed !== 'object') {
				continue
			}
			converted.push({
				...transformed,
				['@context']: context,
				ts,
			})
		}

		return converted
	}

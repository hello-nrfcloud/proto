import type { ErrorObject } from 'ajv'
import type { NRFCloudMessageEnvelope } from 'types/NRFCloudMessageEnvelope'
import { messages } from '../messages'
import schema from '../schemas/NRFCloudMessage.schema.json' assert { type: 'json' }
import { validateWithJSONSchema } from './validateWithJSONSchema.js'

const validator = validateWithJSONSchema(
	schema,
	messages.map(({ $id, schema }) => ({
		$id: $id.toString(),
		...schema,
	})),
)

export const validPassthrough = (
	v: NRFCloudMessageEnvelope,
	onDropped?: (v: unknown, errors: ErrorObject[]) => unknown,
): NRFCloudMessageEnvelope | null => {
	const isValid = validator(v)
	if ('errors' in isValid) {
		onDropped?.(v, isValid.errors)
		return null
	}
	return v
}

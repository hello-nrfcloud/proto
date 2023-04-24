import type { Static } from '@sinclair/typebox'
import type { ErrorObject } from 'ajv'
import type { NRFGuideMessage } from './NRFGuideMessage.js'
import { validator } from './validator.js'

export const validPassthrough = (
	v: unknown,
	onDropped?: (v: unknown, errors: ErrorObject[]) => unknown,
): Static<typeof NRFGuideMessage> | null => {
	const isValid = validator(v)
	if ('errors' in isValid) {
		onDropped?.(v, isValid.errors)
		return null
	}
	return isValid.value
}

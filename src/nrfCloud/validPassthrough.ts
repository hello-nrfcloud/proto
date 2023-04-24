import type { ErrorObject } from 'ajv'
import { validator } from './validator.js'

export const validPassthrough = <Value extends Record<string, any>>(
	v: Value,
	onDropped?: (v: unknown, errors: ErrorObject[]) => unknown,
): Value | null => {
	const isValid = validator(v)
	if ('errors' in isValid) {
		onDropped?.(v, isValid.errors)
		return null
	}
	return v
}

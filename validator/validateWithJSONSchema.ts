import Ajv, { type AnySchema, type ErrorObject, type SchemaObject } from 'ajv'

export const validateWithJSONSchema = <T extends Record<string, any>>(
	schema: SchemaObject,
	schemas?:
		| AnySchema[]
		| {
				[Key in string]?: AnySchema
		  },
): ((value: unknown) => { value: T } | { errors: ErrorObject[] }) => {
	const ajv = new Ajv({ schemas })
	const v = ajv.compile(schema)
	return (value: unknown) => {
		const valid = v(value)
		if (valid !== true) {
			return {
				errors: v.errors as ErrorObject[],
			}
		}
		return { value: value as T }
	}
}

import Ajv, { type AnySchema, type ErrorObject, type SchemaObject } from 'ajv'

export const validateWithJSONSchema = (
	schema: SchemaObject,
	schemas?:
		| AnySchema[]
		| {
				[Key in string]?: AnySchema
		  },
): ((
	value: unknown,
) => { value: unknown } | { errors: ErrorObject[]; input: unknown }) => {
	const ajv = new Ajv({ schemas })
	const v = ajv.compile(schema)
	return (value: unknown) => {
		const valid = v(value)
		if (valid !== true) {
			return {
				errors: v.errors as ErrorObject[],
				input: value,
			}
		}
		return { value }
	}
}

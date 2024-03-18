import { type AnySchema, type ErrorObject, type SchemaObject } from 'ajv'
import ajv from 'ajv'
const Ajv = ajv.default

export const validateWithJSONSchema = <T extends Record<string, any>>(
	schema: SchemaObject,
	schemas?: AnySchema[],
): ((value: unknown) => { value: T } | { errors: ErrorObject[] }) => {
	const ajv = new Ajv()
	for (const schema of schemas ?? []) {
		try {
			ajv.addSchema(schema)
		} catch (err) {
			console.error(`Invalid schema:`)
			console.error(JSON.stringify(schema, null, 2))
			throw err
		}
	}

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

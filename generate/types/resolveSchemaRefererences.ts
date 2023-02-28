type Definitions = {
	[key: string]: Record<string, unknown>
}
type SchemaWithDefs = {
	[key: string]: unknown
	definitions?: Definitions
}

/**
 * Replace references within a schema
 */
export const resolveSchemaRefererences = <Schema extends SchemaWithDefs>(
	schema: Schema,
): Schema => {
	const defs = schema.definitions
	if (defs === undefined) return schema
	return resolve(defs, schema) as Schema
}

const resolve = (defs: Definitions, schema: unknown): unknown => {
	if (schema === null) return schema
	if (isRef(schema)) {
		const id = schema.$ref.split('/').pop() ?? ''
		const replacement = defs[id]
		if (replacement === undefined) return schema
		return replacement
	}
	if (isObject(schema)) {
		return Object.entries(schema).reduce(
			(obj, [k, v]) => ({ ...obj, [k]: resolve(defs, v) }),
			{} as Record<string, unknown>,
		)
	}
	return schema
}

const isRef = (schema: unknown): schema is { $ref: string } =>
	schema !== null && typeof schema === 'object' && '$ref' in schema

const isObject = (schema: unknown): schema is Record<string, unknown> =>
	schema !== null && schema !== undefined && schema.constructor === Object

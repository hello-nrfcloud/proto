import Ajv, { JSONSchemaType, Schema } from 'ajv'

type ObjectPropertiesSchema = {
	properties: {
		appId: { type: 'string' } & ({ const: string } | { pattern: string })
	}
}
export type NRFCloudApplicationSchema = JSONSchemaType<
	| ({
			title: string
			description: string
			type: 'object'
	  } & ObjectPropertiesSchema)
	| { oneOf: ObjectPropertiesSchema[] }
>
export const isSchema = (
	schema: Schema,
): schema is NRFCloudApplicationSchema => {
	try {
		const ajv = new Ajv()
		ajv.compile(schema)
		return true
	} catch {
		return false
	}
}

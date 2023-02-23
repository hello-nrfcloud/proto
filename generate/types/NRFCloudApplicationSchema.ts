import Ajv, { Schema } from 'ajv'

export type RefSchema = { $ref: string }

export type ObjectProperty =
	| {
			type: 'string'
			const?: string
	  }
	| {
			type: 'number'
			description: string
			minimum: number
			maximum: number
	  }
	| {
			enum: string[]
			description: string
	  }
	| ObjectPropertiesSchema
	| RefSchema
export type ObjectPropertiesSchema = {
	type: 'object'
	properties: {
		[key: string]: ObjectProperty
	}
	definitions?: {
		[key: string]: ObjectProperty
	}
	required?: string[]
}
export type NRFCloudApplicationSchema =
	| ({
			title: string
			description: string
	  } & ObjectPropertiesSchema & {
				properties: {
					appId?: { type: 'string' } & ({ const: string } | { pattern: string })
				}
			})
	| { oneOf: ObjectPropertiesSchema[] }

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

export const isObjectSchema = (
	schema: Schema,
): schema is ObjectPropertiesSchema =>
	typeof schema === 'object' && 'properties' in schema

export const isRef = (schema: Schema): schema is RefSchema =>
	typeof schema === 'object' && '$ref' in schema

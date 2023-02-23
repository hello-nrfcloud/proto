import Ajv, { Schema } from 'ajv'

export type RefSchema = { $ref: string }

export type ObjectProperty =
	| {
			type: 'string'
			const?: string
	  }
	| {
			type: 'number' | 'integer'
			description?: string
			minimum?: number
			maximum?: number
	  }
	| {
			enum: string[]
			description?: string
	  }
	| {
			type: 'boolean'
			description?: string
	  }
	| ObjectPropertiesSchema
	| RefSchema

export type ArrayProperty = {
	type: 'array'
	description?: string
	items: ObjectPropertiesSchema
	minItems?: number
	uniqueItems?: boolean
}

export type ObjectPropertiesSchema = {
	type: 'object'
	properties: {
		[key: string]: ObjectProperty | ArrayProperty | RefSchema
	}
	required?: string[]
	additionalProperties?: boolean
}
export type MessageSchema =
	| ObjectPropertiesSchema
	| { oneOf: ObjectPropertiesSchema[] }

export type NRFCloudApplicationSchema =
	| {
			title: string
			description: string
			definitions?: {
				[key: string]: ObjectProperty | ArrayProperty
			}
	  } & (
			| {
					type: 'object'
					properties: {
						appId: { type: 'string'; const?: string }
					}
			  }
			| {
					oneOf: [
						{
							type: 'object'
							properties: {
								appId: { type: 'string'; const?: string }
							}
						},
					]
			  }
	  )

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

export const isArrayPropertySchema = (
	schema: Schema,
): schema is ArrayProperty =>
	typeof schema === 'object' && 'type' in schema && schema.type === 'array'

export const isRef = (schema: Schema): schema is RefSchema =>
	typeof schema === 'object' && '$ref' in schema

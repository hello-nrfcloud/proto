import Ajv, { Schema } from 'ajv'

export type RefSchema = { $ref: string }

export type Direction = 'deviceToCloud' | 'cloudToDevice'

export type NRFCloudApplicationSchema = ObjectSchema & {
	title: string
	description: string
	properties: {
		appId: {
			type: 'string'
			const: string
		}
		[key: string]: JSONSchemaType
	}
	definitions?: {
		[key: string]: Record<string, unknown>
	}
}
type BaseType = {
	description?: string
	type: string
}
export type EnumSchema = {
	enum: string[]
} & BaseType

export type ArraySchema = {
	type: 'array'
	items: JSONSchemaType
	minItems?: number
} & BaseType

export type UnionSchema = {
	oneOf: JSONSchemaType[]
} & BaseType

export type StringSchema = {
	type: 'string'
	const?: string
} & BaseType

export type NumberSchema = {
	type: 'integer' | 'number'
	minimum?: number
	maximum?: number
} & BaseType

export type BooleanSchema = {
	type: 'boolean'
} & BaseType

export type JSONSchemaType =
	| EnumSchema
	| StringSchema
	| ObjectSchema
	| BooleanSchema
	| NumberSchema

export type ObjectPropertySchema = JSONSchemaType

export type ObjectSchema = {
	title?: string
	description?: string
	type: 'object'
	properties: {
		[key: string]: ObjectPropertySchema
	}
	additionalProperties?: boolean
	required?: string[]
}

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

export const isEnumSchema = (schema: BaseType): schema is EnumSchema =>
	'enum' in schema

export const isArraySchema = (schema: BaseType): schema is ArraySchema =>
	'type' in schema && schema.type === 'array'

export const isObjectSchema = (schema: BaseType): schema is ObjectSchema =>
	schema.type === 'object' && 'properties' in schema

export const isUnionTypeSchema = (schema: BaseType): schema is UnionSchema =>
	'oneOf' in schema

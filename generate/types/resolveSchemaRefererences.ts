import {
	isObjectSchema,
	isRef,
	NRFCloudApplicationSchema,
	ObjectPropertiesSchema,
} from './NRFCloudApplicationSchema'

export const resolveSchemaRefererences = (
	schema: NRFCloudApplicationSchema,
	root = schema,
): NRFCloudApplicationSchema => {
	if (isRef(schema)) {
		return root.definitions[schema.$ref.split('/').pop()]
	}
	if (isObjectSchema(schema))
		return {
			...schema,
			properties: Object.entries(schema.properties).reduce(
				(props, [id, property]) => ({
					...props,
					[id]: resolveSchemaRefererences(property, root),
				}),
				{} as ObjectPropertiesSchema['properties'],
			),
		}
	return schema
}

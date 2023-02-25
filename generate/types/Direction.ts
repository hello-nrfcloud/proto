export const customTypeName = (schema: { title: string }): string | null => {
	if (schema.title === 'GNSS') return 'GNSS'
	return schema.title
}
export const typeName = (schema: {
	title: string
	properties: { appId: { const?: string } }
}): string | null => schema.properties?.appId?.const ?? customTypeName(schema)

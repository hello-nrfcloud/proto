import { resolveSchemaRefererences } from './resolveSchemaRefererences'

describe('resolveSchemaReferences()', () => {
	it('should resolve schema references', () =>
		expect(
			resolveSchemaRefererences({
				title: 'Cell Position Response',
				description: 'Responds with coordinates',
				type: 'object',
				properties: {
					appId: {
						type: 'string',
						const: 'CELL_POS',
					},
					messageType: {
						type: 'string',
						const: 'DATA',
					},
					data: {
						type: 'object',
						properties: {
							lat: {
								$ref: '#/definitions/Lat',
							},
							lon: {
								$ref: '#/definitions/Lon',
							},
						},
					},
				},
				definitions: {
					Lat: {
						type: 'number',
						description: 'GPS latitude',
						minimum: -90,
						maximum: 90,
					},
					Lon: {
						type: 'number',
						description: 'GPS longitude',
						minimum: -180,
						maximum: 180,
					},
				},
			}),
		).toMatchObject({
			title: 'Cell Position Response',
			description: 'Responds with coordinates',
			type: 'object',
			properties: {
				appId: {
					type: 'string',
					const: 'CELL_POS',
				},
				messageType: {
					type: 'string',
					const: 'DATA',
				},
				data: {
					type: 'object',
					properties: {
						lat: {
							type: 'number',
							description: 'GPS latitude',
							minimum: -90,
							maximum: 90,
						},
						lon: {
							type: 'number',
							description: 'GPS longitude',
							minimum: -180,
							maximum: 180,
						},
					},
				},
			},
		}))
})

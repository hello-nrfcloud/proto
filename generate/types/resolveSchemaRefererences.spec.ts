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

	it('should also resolve then in arrays', () =>
		expect(
			resolveSchemaRefererences({
				title: 'Cell Position',
				description: 'CELL_POS request',
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
							doReply: {
								$ref: '#/definitions/DoReply',
							},
							lte: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										mcc: {
											$ref: '#/definitions/Mcc',
										},
										nmr: {
											type: 'array',
											items: {
												type: 'object',
												properties: {
													earfcn: {
														$ref: '#/definitions/Earfcn',
													},
												},
											},
										},
									},
								},
							},
						},
					},
				},
				definitions: {
					DoReply: {
						type: 'boolean',
						description:
							'Does not reply, even in event of an error, if set to false. Defaults to true.',
					},
					Mcc: {
						type: 'integer',
						description: 'Mobile Country Code',
					},
					Earfcn: {
						type: 'integer',
						description: 'Evolved Absolute Radio Frequency Channel (E-ARFCN).',
						minimum: 0,
						maximum: 262143,
					},
				},
			}),
		).toMatchObject({
			title: 'Cell Position',
			description: 'CELL_POS request',
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
						doReply: {
							type: 'boolean',
							description:
								'Does not reply, even in event of an error, if set to false. Defaults to true.',
						},
						lte: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									mcc: {
										type: 'integer',
										description: 'Mobile Country Code',
									},
									nmr: {
										type: 'array',
										items: {
											type: 'object',
											properties: {
												earfcn: {
													type: 'integer',
													description:
														'Evolved Absolute Radio Frequency Channel (E-ARFCN).',
													minimum: 0,
													maximum: 262143,
												},
											},
										},
									},
								},
							},
						},
					},
				},
			},
		}))
})

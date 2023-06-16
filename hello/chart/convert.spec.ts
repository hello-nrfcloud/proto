import jsonata from 'jsonata'
import { historicalConvert } from './convert.js'

describe('historicalConvert()', () => {
	it('should pass request as is if no transformer defined', async () => {
		const getTransformExpressions = jest.fn(async () =>
			Promise.resolve({
				'historical-data': {
					filter: jsonata(`message = 'gain'`),
				},
			}),
		)

		const res = await historicalConvert({
			getTransformExpressions,
		})('PCA20035+solar')({
			'@context':
				'https://github.com/hello-nrfcloud/proto/historical-data-request',
			'@id': 'test-id',
			type: 'lastHour',
			attributes: {
				avgMA: { attribute: 'mA', aggregate: 'avg' },
			},
			message: 'gain',
			data: {
				avgMA: [
					{
						mA: 1,
						ts: 1686911202000,
					},
					{
						mA: 2,
						ts: 1686911203000,
					},
				],
			},
			ts: 1681985385063,
		})
		expect(res).toMatchObject([
			{
				['@context']: new URL(
					'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/historical-data',
				),
				'@id': 'test-id',
				type: 'lastHour',
				message: 'gain',
				data: {
					avgMA: [
						{
							mA: 1,
							ts: 1686911202000,
						},
						{
							mA: 2,
							ts: 1686911203000,
						},
					],
				},
				ts: 1681985385063,
			},
		])

		expect(getTransformExpressions).toHaveBeenCalledWith('PCA20035+solar')
	})

	it('should convert the gain historical data request', async () => {
		const getTransformExpressions = jest.fn(async () =>
			Promise.resolve({
				'historical-data': {
					filter: jsonata(`message = 'gain'`),
					transform: jsonata(`{ 'attributes': data }`),
				},
			}),
		)
		const onError = jest.fn().mockName('error callback')

		const res = await historicalConvert({
			getTransformExpressions,
			onError,
		})('PCA20035+solar')({
			'@context':
				'https://github.com/hello-nrfcloud/proto/historical-data-request',
			'@id': 'test-id',
			type: 'lastHour',
			attributes: {
				avgMA: { attribute: 'mA', aggregate: 'avg' },
			},
			message: 'gain',
			data: {
				avgMA: [
					{
						mA: 1,
						ts: 1686911202000,
					},
					{
						mA: 2,
						ts: 1686911203000,
					},
				],
			},
			ts: 1681985385063,
		})

		expect(onError).not.toHaveBeenCalled()
		expect(res).toMatchObject([
			{
				'@context': new URL(
					'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/historical-data',
				),
				'@id': 'test-id',
				attributes: {
					avgMA: [
						{
							mA: 1,
							ts: 1686911202000,
						},
						{
							mA: 2,
							ts: 1686911203000,
						},
					],
				},
				ts: 1681985385063,
			},
		])

		expect(getTransformExpressions).toHaveBeenCalledWith('PCA20035+solar')
	})

	it('should convert the voltage with min and max historical data request', async () => {
		const getTransformExpressions = jest.fn(async () =>
			Promise.resolve({
				'historical-data': {
					filter: jsonata(`message = 'voltage'`),
					transform: jsonata(`{ 'attributes': data }`),
				},
			}),
		)
		const onError = jest.fn().mockName('error callback')

		const res = await historicalConvert({
			getTransformExpressions,
			onError,
		})('PCA20035+solar')({
			'@context':
				'https://github.com/hello-nrfcloud/proto/historical-data-request',
			'@id': 'test-id',
			type: 'lastHour',
			attributes: {
				minV: { attribute: 'v', aggregate: 'min' },
				maxV: { attribute: 'v', aggregate: 'max' },
			},
			message: 'voltage',
			data: {
				minV: [
					{
						v: 3.456,
						ts: 1686911202000,
					},
					{
						v: 3.455,
						ts: 1686911203000,
					},
				],
				maxV: [
					{
						v: 4.123,
						ts: 1686911202000,
					},
					{
						v: 4.124,
						ts: 1686911203000,
					},
				],
			},
			ts: 1681985385063,
		})

		expect(onError).not.toHaveBeenCalled()
		expect(res).toMatchObject([
			{
				'@context': new URL(
					'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/historical-data',
				),
				'@id': 'test-id',
				attributes: {
					minV: [
						{
							v: 3.456,
							ts: 1686911202000,
						},
						{
							v: 3.455,
							ts: 1686911203000,
						},
					],
					maxV: [
						{
							v: 4.123,
							ts: 1686911202000,
						},
						{
							v: 4.124,
							ts: 1686911203000,
						},
					],
				},
				ts: 1681985385063,
			},
		])

		expect(getTransformExpressions).toHaveBeenCalledWith('PCA20035+solar')
	})

	it('should not process the historical request with invalid aggregation', async () => {
		const errorLog = jest.fn()
		const getTransformExpressions = jest.fn(async () =>
			Promise.resolve({
				'historical-data': {
					filter: jsonata(`message = 'gain'`),
					transform: jsonata(`{ 'attributes': data }`),
				},
			}),
		)

		expect(
			await historicalConvert({
				getTransformExpressions,
				onError: errorLog,
			})('PCA20035+solar')({
				'@context':
					'https://github.com/hello-nrfcloud/proto/historical-data-request',
				'@id': 'test-id',
				type: 'lastHour',
				message: 'gain',
				attributes: {
					p95MA: { attribute: 'mA', aggregate: 'p95' },
				},
				data: {
					p95MA: [
						{
							mA: 1,
							ts: 1686911202000,
						},
						{
							mA: 2,
							ts: 1686911203000,
						},
					],
				},
				ts: 1681985385063,
			}),
		).toMatchObject([])

		expect(errorLog).toHaveBeenCalledWith(
			{
				'@context':
					'https://github.com/hello-nrfcloud/proto/historical-data-request',
				'@id': 'test-id',
				type: 'lastHour',
				message: 'gain',
				attributes: {
					p95MA: { attribute: 'mA', aggregate: 'p95' },
				},
				data: {
					p95MA: [
						{
							mA: 1,
							ts: 1686911202000,
						},
						{
							mA: 2,
							ts: 1686911203000,
						},
					],
				},
				ts: 1681985385063,
			},
			'PCA20035+solar',
			`Not a historical data request.`,
			expect.anything(),
		)
	})

	it('should not process the historical request with invalid type', async () => {
		const errorLog = jest.fn()
		const getTransformExpressions = jest.fn(async () =>
			Promise.resolve({
				'historical-data': {
					filter: jsonata(`message = 'gain'`),
					transform: jsonata(`{ 'attributes': data }`),
				},
			}),
		)

		expect(
			await historicalConvert({
				getTransformExpressions,
				onError: errorLog,
			})('PCA20035+solar')({
				'@context':
					'https://github.com/hello-nrfcloud/proto/historical-data-request',
				'@id': 'test-id',
				type: 'lastYear',
				message: 'gain',
				attributes: {
					avgMA: { attribute: 'mA', aggregate: 'avg' },
				},
				data: {
					avgMA: [
						{
							mA: 1,
							ts: 1686911202000,
						},
						{
							mA: 2,
							ts: 1686911203000,
						},
					],
				},
				ts: 1681985385063,
			}),
		).toMatchObject([])

		expect(errorLog).toHaveBeenCalledWith(
			{
				'@context':
					'https://github.com/hello-nrfcloud/proto/historical-data-request',
				'@id': 'test-id',
				type: 'lastYear',
				message: 'gain',
				attributes: {
					avgMA: { attribute: 'mA', aggregate: 'avg' },
				},
				data: {
					avgMA: [
						{
							mA: 1,
							ts: 1686911202000,
						},
						{
							mA: 2,
							ts: 1686911203000,
						},
					],
				},
				ts: 1681985385063,
			},
			'PCA20035+solar',
			`Not a historical data request.`,
			expect.anything(),
		)
	})

	it('should not process unknown messages', async () => {
		const errorLog = jest.fn()
		expect(
			await historicalConvert({
				getTransformExpressions: async () => Promise.resolve({}),
				onError: errorLog,
			})('Thingy:91')({
				foo: 'bar',
			}),
		).toMatchObject([])

		expect(errorLog).toHaveBeenCalledWith(
			{
				foo: 'bar',
			},
			'Thingy:91',
			`Not a historical data request.`,
			expect.anything(),
		)
	})

	it('should not process any request if there are no converters', async () => {
		const errorLog = jest.fn()
		expect(
			await historicalConvert({
				getTransformExpressions: async () => Promise.resolve({}),
				onError: errorLog,
			})('Thingy:91')({
				'@context':
					'https://github.com/hello-nrfcloud/proto/historical-data-request',
				'@id': 'test-id',
				type: 'lastHour',
				attributes: {
					avgMA: { attribute: 'mA', aggregate: 'avg' },
				},
				message: 'gain',
				data: {
					avgMA: [
						{
							mA: 1,
							ts: 1686911202000,
						},
						{
							mA: 2,
							ts: 1686911203000,
						},
					],
				},
				ts: 1681985385063,
			}),
		).toMatchObject([])
		expect(errorLog).toHaveBeenCalledWith(
			{
				'@context':
					'https://github.com/hello-nrfcloud/proto/historical-data-request',
				'@id': 'test-id',
				type: 'lastHour',
				attributes: {
					avgMA: { attribute: 'mA', aggregate: 'avg' },
				},
				message: 'gain',
				data: {
					avgMA: [
						{
							mA: 1,
							ts: 1686911202000,
						},
						{
							mA: 2,
							ts: 1686911203000,
						},
					],
				},
				ts: 1681985385063,
			},
			'Thingy:91',
			`No expressions defined.`,
			[],
		)
	})
})

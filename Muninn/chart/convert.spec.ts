import jsonata from 'jsonata'
import { historicalConvert } from './convert.js'

describe('historicalConvert()', () => {
	it('should convert the gain historical data request', async () => {
		const getTransformExpressions = jest.fn(async () =>
			Promise.resolve({
				reported: {
					filter: jsonata(`message = 'gain'`),
					transform: jsonata(`data`),
				},
			}),
		)
		const onError = jest.fn().mockName('error callback')

		const res = await historicalConvert({
			getTransformExpressions,
			onError,
		})('PCA20035+solar')({
			'@context':
				'https://github.com/bifravst/Muninn-proto/historical-data-request',
			'@id': 'test-id',
			type: 'lastHour',
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
		})

		expect(onError).not.toHaveBeenCalled()
		expect(res).toMatchObject([
			{
				'@context': 'https://github.com/bifravst/Muninn-proto/historical-data',
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
			},
		])

		expect(getTransformExpressions).toHaveBeenCalledWith('PCA20035+solar')
	})
})

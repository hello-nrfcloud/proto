import { proto } from './proto.js'

describe('hello.nrfcloud.com historical request', () => {
	describe('PCA20035+solar: Historical requests', () => {
		it.each([
			[
				{
					'@context':
						'https://github.com/hello-nrfcloud/proto/historical-data-request',
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
				},
				{
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/historical-data',
					).toString(),
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
			],
		])(
			'should convert %j to %j and validate it',
			async (message, transformed) => {
				const onError = jest.fn().mockName('error callback')
				const res = await proto({ onError })('PCA20035+solar', message)
				expect(onError).not.toHaveBeenCalled()
				expect(res).toMatchObject([transformed])
			},
		)
	})
})

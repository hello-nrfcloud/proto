import { chartProto } from './proto.js'

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
			[
				{
					'@context':
						'https://github.com/hello-nrfcloud/proto/historical-data-request',
					'@id': 'test-id',
					type: 'lastHour',
					message: 'voltage',
					attributes: {
						minV: { attribute: 'v', aggregate: 'min' },
					},
					data: {
						minV: [
							{
								v: 3.455,
								ts: 1686911202000,
							},
							{
								v: 3.454,
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
						minV: [
							{
								v: 3.455,
								ts: 1686911202000,
							},
							{
								v: 3.454,
								ts: 1686911203000,
							},
						],
					},
				},
			],
			[
				{
					'@context':
						'https://github.com/hello-nrfcloud/proto/historical-data-request',
					'@id': 'test-id',
					type: 'lastMonth',
					message: 'voltage',
					attributes: {
						minV: { attribute: 'v', aggregate: 'min' },
						maxV: { attribute: 'v', aggregate: 'max' },
					},
					data: {
						minV: [
							{
								v: 3.455,
								ts: 1686911202000,
							},
							{
								v: 3.454,
								ts: 1686911203000,
							},
						],
						maxV: [
							{
								v: 4.234,
								ts: 1686911202000,
							},
							{
								v: 4.235,
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
						minV: [
							{
								v: 3.455,
								ts: 1686911202000,
							},
							{
								v: 3.454,
								ts: 1686911203000,
							},
						],
						maxV: [
							{
								v: 4.234,
								ts: 1686911202000,
							},
							{
								v: 4.235,
								ts: 1686911203000,
							},
						],
					},
				},
			],
			[
				{
					'@context':
						'https://github.com/hello-nrfcloud/proto/historical-data-request',
					'@id': 'test-id',
					type: 'lastDay',
					message: 'location',
					attributes: {
						lat: { attribute: 'lat' },
						lng: { attribute: 'lng' },
						acc: { attribute: 'acc' },
						ts: { attribute: 'ts' },
					},
					data: [
						{
							lat: 1,
							lng: 2,
							acc: 2,
							ts: 1686911202000,
						},
						{
							lat: 2,
							lng: 3,
							acc: 4,
							ts: 1686911203000,
						},
					],
				},
				{
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/historical-data',
					).toString(),
					'@id': 'test-id',
					attributes: [
						{
							lat: 1,
							lng: 2,
							acc: 2,
							ts: 1686911202000,
						},
						{
							lat: 2,
							lng: 3,
							acc: 4,
							ts: 1686911203000,
						},
					],
				},
			],
		])(
			'should convert %j to %j and validate it',
			async (message, transformed) => {
				const onError = jest.fn().mockName('error callback')
				const res = await chartProto({ onError })('PCA20035+solar', message)
				expect(onError).not.toHaveBeenCalled()
				expect(res).toMatchObject([transformed])
			},
		)
	})
})

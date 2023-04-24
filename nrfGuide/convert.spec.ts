import jsonata from 'jsonata'
import shadow from '../nrfCloud/examples/shadow.json'
import { convert } from './convert.js'

describe('convert()', () => {
	it('should convert the nRF Cloud message format to the nRF Guide message format', async () => {
		const getTransformExpressions = jest.fn(async () =>
			Promise.resolve({
				voltage: {
					filter: jsonata(`appId = 'VOLTAGE'`),
					transform: jsonata(`{ 'v': $number(data)/1000 }`),
				},
			}),
		)

		expect(
			await convert({
				getTransformExpressions,
			})('PCA20035+solar')({
				appId: 'VOLTAGE',
				messageType: 'DATA',
				ts: 1681985385063,
				data: '4085',
			}),
		).toMatchObject([
			{
				['@context']: new URL(
					'https://github.com/bifravst/nRF.guide-proto/transformed/PCA20035%2Bsolar/voltage',
				),
				ts: 1681985385063,
				v: 4.085,
			},
		])

		expect(getTransformExpressions).toHaveBeenCalledWith('PCA20035+solar')
	})

	it('should convert the shadow', async () => {
		const getTransformExpressions = jest.fn(async () =>
			Promise.resolve({
				reported: {
					filter: jsonata(`true`),
					transform: jsonata(`{'version': version}`),
				},
			}),
		)
		const onError = jest.fn().mockName('error callback')

		const res = await convert({
			getTransformExpressions,
			onError,
		})('PCA20035+solar')(shadow.state)

		expect(onError).not.toHaveBeenCalled()
		expect(res).toMatchObject([
			{
				['@context']: new URL(
					'https://github.com/bifravst/nRF.guide-proto/transformed/PCA20035%2Bsolar/reported',
				),
				version: 8835,
			},
		])

		expect(getTransformExpressions).toHaveBeenCalledWith('PCA20035+solar')
	})

	it('should pass messages as is if no transformer defined', async () => {
		const getTransformExpressions = jest.fn(async () =>
			Promise.resolve({
				voltage: {
					filter: jsonata(`appId = 'VOLTAGE'`),
				},
			}),
		)

		expect(
			await convert({
				getTransformExpressions,
			})('PCA20035+solar')({
				appId: 'VOLTAGE',
				messageType: 'DATA',
				ts: 1681985385063,
				data: '4085',
			}),
		).toMatchObject([
			{
				['@context']: new URL(
					'https://github.com/bifravst/nRF.guide-proto/transformed/PCA20035%2Bsolar/voltage',
				),
				ts: 1681985385063,
				appId: 'VOLTAGE',
				messageType: 'DATA',
				data: '4085',
			},
		])

		expect(getTransformExpressions).toHaveBeenCalledWith('PCA20035+solar')
	})

	it('should not process any messages if there are no converters', async () => {
		const errorLog = jest.fn()
		expect(
			await convert({
				getTransformExpressions: async () => Promise.resolve({}),
				onError: errorLog,
			})('Thingy:91')({
				appId: 'AIR_PRESS',
				messageType: 'DATA',
				ts: 1681985384511,
				data: '102.31',
			}),
		).toMatchObject([])
		expect(errorLog).toHaveBeenCalledWith(
			{
				appId: 'AIR_PRESS',
				messageType: 'DATA',
				ts: 1681985384511,
				data: '102.31',
			},
			'Thingy:91',
			`No expressions defined.`,
		)
	})

	it('should not process unknown messages', async () => {
		const errorLog = jest.fn()
		expect(
			await convert({
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
			`Not a nRF Cloud Message.`,
		)
	})
})

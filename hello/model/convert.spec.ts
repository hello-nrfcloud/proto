import jsonata from 'jsonata'
import shadow from '../../nrfCloud/examples/shadow.json' assert { type: 'json' }
import { convert } from './convert.js'
import { describe, test as it, mock } from 'node:test'
import assert from 'node:assert/strict'
import { check, objectMatching, anArray } from 'tsmatchers'
import { Context } from '../Context.js'
import type { SingleCellGeoLocation } from '../SingleCellGeoLocation.js'
import type { Static } from '@sinclair/typebox'

void describe('convert()', () => {
	void it('should convert the nRF Cloud message format to the hello.nrfcloud.com message format', async () => {
		const getTransformExpressions = mock.fn(async () =>
			Promise.resolve({
				battery: [
					{
						filter: jsonata(`appId = 'BATTERY'`),
						transform: jsonata(`{ '%': $number(data) }`),
					},
				],
			}),
		)

		assert.deepEqual(
			await convert({
				getTransformExpressions,
			})('PCA20035+solar')({
				appId: 'BATTERY',
				messageType: 'DATA',
				ts: 1681985385063,
				data: '94',
			}),

			[
				{
					['@context']: new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/battery',
					),
					ts: 1681985385063,
					'%': 94,
				},
			],
		)

		assert.deepEqual(getTransformExpressions.mock.calls[0]?.arguments, [
			'PCA20035+solar',
		])
	})

	void it('should convert the shadow', async () => {
		const getTransformExpressions = mock.fn(async () =>
			Promise.resolve({
				reported: [
					{
						filter: jsonata(`true`),
						transform: jsonata(`{'version': version}`),
					},
				],
			}),
		)
		const onError = mock.fn()

		const res = await convert({
			getTransformExpressions,
			onError,
		})('PCA20035+solar')(shadow.state)

		assert.equal(onError.mock.calls.length, 0)
		assert.deepEqual(res, [
			{
				['@context']: new URL(
					'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/reported',
				),
				version: 8835,
				ts: 1682072423000,
			},
		])

		assert.deepEqual(getTransformExpressions.mock.calls[0]?.arguments, [
			'PCA20035+solar',
		])
	})

	void it('should pass messages as is if no transformer defined', async () => {
		const getTransformExpressions = mock.fn(async () =>
			Promise.resolve({
				battery: [
					{
						filter: jsonata(`appId = 'BATTERY'`),
					},
				],
			}),
		)

		assert.deepEqual(
			await convert({
				getTransformExpressions,
			})('PCA20035+solar')({
				appId: 'BATTERY',
				messageType: 'DATA',
				ts: 1681985385063,
				data: '94',
			}),

			[
				{
					['@context']: new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/battery',
					),
					ts: 1681985385063,
					appId: 'BATTERY',
					messageType: 'DATA',
					data: '94',
				},
			],
		)

		assert.deepEqual(getTransformExpressions.mock.calls[0]?.arguments, [
			'PCA20035+solar',
		])
	})

	void it('should not process any messages if there are no converters', async () => {
		const errorLog = mock.fn()
		assert.deepEqual(
			await convert({
				getTransformExpressions: async () => Promise.resolve({}),
				onError: errorLog,
			})('Thingy:91')({
				appId: 'AIR_PRESS',
				messageType: 'DATA',
				ts: 1681985384511,
				data: '102.31',
			}),
			[],
		)
		assert.deepEqual(errorLog.mock.calls[0]?.arguments, [
			{
				appId: 'AIR_PRESS',
				messageType: 'DATA',
				ts: 1681985384511,
				data: '102.31',
			},
			'Thingy:91',
			`No expressions defined.`,
			[],
		])
	})

	void it('should not process unknown messages', async () => {
		const errorLog = mock.fn()
		assert.deepEqual(
			await convert({
				getTransformExpressions: async () => Promise.resolve({}),
				onError: errorLog,
			})('Thingy:91')({
				foo: 'bar',
			}),
			[],
		)
		check(errorLog.mock.calls[0]?.arguments[0]).is(
			objectMatching({
				foo: 'bar',
			}),
		)
		check(errorLog.mock.calls[0]?.arguments[1]).is('Thingy:91')
		check(errorLog.mock.calls[0]?.arguments[2]).is(`Not a valid message.`)
		check(errorLog.mock.calls[0]?.arguments[3]).is(anArray)
	})

	void it('should convert multiple incoming messages to the same result', async () => {
		const getTransformExpressions = mock.fn(async () =>
			Promise.resolve({
				location: [
					{
						filter: jsonata(
							`appId = 'GROUND_FIX' and $exists(data.lat) and $exists(data.lon) and $exists(data.uncertainty) and $exists(data.fulfilledWith)`,
						),
						transform: jsonata(`{
						"lat": data.lat,
						"lng": data.lon,
						"acc": data.uncertainty,
						"src": data.fulfilledWith
					}`),
					},
					{
						filter: jsonata(
							`\`@context\` = "${Context.singleCellGeoLocation.toString()}"`,
						),
						transform: jsonata(`{
						'lat': lat,
						'lng': lng,
						'acc': accuracy,
						'ts': ts,
						'src': 'SCELL'
					}`),
					},
				],
			}),
		)

		const incomingSingleCell: Static<typeof SingleCellGeoLocation> = {
			'@context':
				'https://github.com/hello-nrfcloud/proto/single-cell-geo-location',
			lat: 63.41999531,
			lng: 10.42999506,
			accuracy: 2420,
			ts: 1690378551538,
		}

		assert.deepEqual(
			await convert({
				getTransformExpressions,
			})('PCA20035+solar')(incomingSingleCell),

			[
				{
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/location',
					),
					lat: 63.41999531,
					lng: 10.42999506,
					acc: 2420,
					src: 'SCELL',
					ts: 1690378551538,
				},
			],
		)

		assert.deepEqual(getTransformExpressions.mock.calls[0]?.arguments, [
			'PCA20035+solar',
		])
	})
})

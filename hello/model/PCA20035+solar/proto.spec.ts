import assert from 'node:assert/strict'
import { describe, test as it, mock } from 'node:test'
import { aNumber, arrayContaining, check, objectMatching } from 'tsmatchers'
import GROUND_FIX_RESPONSE from '../../../nrfCloud/examples/cloudToDevice/GROUND_FIX.json' assert { type: 'json' }
import AIR_PRESS from '../../../nrfCloud/examples/deviceToCloud/AIR_PRESS.json' assert { type: 'json' }
import AIR_QUAL from '../../../nrfCloud/examples/deviceToCloud/AIR_QUAL.json' assert { type: 'json' }
import BUTTON from '../../../nrfCloud/examples/deviceToCloud/BUTTON.json' assert { type: 'json' }
import DEVICE from '../../../nrfCloud/examples/deviceToCloud/DEVICE-deviceInfo.json' assert { type: 'json' }
import GNSS from '../../../nrfCloud/examples/deviceToCloud/GNSS.json' assert { type: 'json' }
import GROUND_FIX_REQUEST from '../../../nrfCloud/examples/deviceToCloud/GROUND_FIX.json' assert { type: 'json' }
import HUMID from '../../../nrfCloud/examples/deviceToCloud/HUMID.json' assert { type: 'json' }
import RSRP from '../../../nrfCloud/examples/deviceToCloud/RSRP.json' assert { type: 'json' }
import TEMP from '../../../nrfCloud/examples/deviceToCloud/TEMP.json' assert { type: 'json' }
import shadowNoNetworkInfo from '../../../nrfCloud/examples/shadow-no-networkInfo.json' assert { type: 'json' }
import shadow from '../../../nrfCloud/examples/shadow.json' assert { type: 'json' }
import { getShadowUpdateTime } from '../../../nrfCloud/getShadowUpdateTime.js'
import battery from './examples/BATTERY.json' assert { type: 'json' }
import deviceWithEnergyEstimate from './examples/DEVICE-networkInfo-with-eest.json' assert { type: 'json' }
import GROUND_FIX_REQUEST2 from './examples/GROUND_FIX.json' assert { type: 'json' }
import GROUND_FIX_with_timeDiff from './examples/GROUND_FIX_with_timeDiff.json' assert { type: 'json' }
import solar from './examples/SOLAR.json' assert { type: 'json' }
import desiredConfig from './examples/desiredConfig.json' assert { type: 'json' }
import { validator } from './message.js'
import { proto } from './proto.js'

void describe('hello.nrfcloud.com messages', () => {
	void describe('PCA20035+solar: Thingy:91 with solar shield messages', () => {
		for (const [message, transformed] of [
			[
				shadow.state,
				objectMatching({
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/reported',
					).toString(),
					connected: true,
					version: 8835,
					config: {
						activeMode: false,
						locationTimeout: 300,
						activeWaitTime: 120,
						movementResolution: 120,
						movementTimeout: 3600,
						accThreshAct: 4,
						accThreshInact: 4,
						accTimeoutInact: 60,
						nod: [],
					},
					device: {
						deviceInfo: {
							appVersion: '1.10.0+thingy91.low-power.solar.memfault.nrfcloud',
							modemFirmware: 'mfw_nrf9160_1.3.4',
							imei: '352656108602296',
							board: 'thingy91_nrf9160',
							sdkVer: 'v2.4.0',
							appName: 'asset_tracker_v2',
							zephyrVer: 'f8f113382356',
							hwVer: 'nRF9160 SICA B1A',
						},
						simInfo: {
							uiccMode: 0,
							iccid: '89457387300008502299',
							imsi: '234500070442919',
						},
						networkInfo: {
							currentBand: 20,
							networkMode: 'LTE-M',
							rsrp: -97,
							areaCode: 30401,
							mccmnc: 24201,
							cellID: 21679616,
							ipAddress: '100.74.127.55',
							eest: 7,
						},
					},
					ts: getShadowUpdateTime(shadow.state.metadata) * 1000,
					lastUpdate: {
						device: {
							networkInfo: {
								networkMode: 1682072423000,
								mccmnc: 1682072423000,
								eest: 1682072423000,
							},
							deviceInfo: {
								appVersion: 1681975785000,
							},
						},
					},
				}),
			],
			[
				shadowNoNetworkInfo.state,
				objectMatching({
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/reported',
					).toString(),
					device: {
						deviceInfo: {
							appVersion: '1.10.0+thingy91.low-power.solar.memfault.nrfcloud',
							modemFirmware: 'mfw_nrf9160_1.3.4',
							imei: '352656108602296',
							board: 'thingy91_nrf9160',
							sdkVer: 'v2.4.0',
							appName: 'asset_tracker_v2',
							zephyrVer: 'f8f113382356',
							hwVer: 'nRF9160 SICA B1A',
						},
						simInfo: {
							uiccMode: 0,
							iccid: '89457387300008502299',
							imsi: '234500070442919',
						},
					},
				}),
			],
			[
				solar,
				objectMatching({
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/gain',
					).toString(),
					ts: solar.ts,
					mA: 3.123456,
				}),
			],
			[
				battery,
				objectMatching({
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/battery',
					).toString(),
					ts: battery.ts,
					'%': 94,
				}),
			],
			[
				GROUND_FIX_RESPONSE,
				objectMatching({
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/location',
					).toString(),
					lat: 59.3381238,
					lng: 18.00908089,
					acc: 883.66,
					src: 'MCELL',
					ts: aNumber,
				}),
			],
			[
				deviceWithEnergyEstimate,
				objectMatching({
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/networkInfo',
					).toString(),
					ts: deviceWithEnergyEstimate.ts,
					currentBand: 20,
					networkMode: 'LTE-M',
					rsrp: -99,
					areaCode: 30401,
					mccmnc: 24201,
					cellID: 21679616,
					ipAddress: '100.74.127.55',
					eest: 7,
				}),
			],
			[
				RSRP,
				objectMatching({
					ts: RSRP.ts,
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/rsrp',
					).toString(),
					rsrp: -96,
				}),
			],
			[
				AIR_PRESS,
				objectMatching({
					ts: AIR_PRESS.ts,
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/airPressure',
					).toString(),
					mbar: 1023.1,
				}),
			],
			[
				AIR_QUAL,
				objectMatching({
					ts: AIR_QUAL.ts,
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/airQuality',
					).toString(),
					IAQ: 177,
				}),
			],
			[
				DEVICE,
				objectMatching({
					ts: DEVICE.ts,
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/deviceInfo',
					).toString(),
					imei: '350457794611739',
					iccid: '8931080620054223678',
					modemFirmware: 'mfw_nrf9160_1.3.3',
					board: 'thingy91_nrf9160',
					appVersion: '0.0.0-development',
				}),
			],
			[
				TEMP,
				objectMatching({
					ts: TEMP.ts,
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/airTemperature',
					).toString(),
					c: 25.73,
				}),
			],
			[
				HUMID,
				objectMatching({
					ts: HUMID.ts,
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/airHumidity',
					).toString(),
					p: 23.16,
				}),
			],
			[
				BUTTON,
				objectMatching({
					ts: BUTTON.ts,
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/button',
					).toString(),
					id: 1,
				}),
			],
			[
				GNSS,
				{
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/location',
					).toString(),
					lng: 10.437692463102255,
					lat: 63.43308707524497,
					acc: 4.703136444091797,
					alt: 138.33331298828125,
					spd: 0.02938256226480007,
					hdg: 185.11207580566406,
					src: 'GNSS',
					ts: GNSS.ts,
				},
			],
			[
				{
					'@context':
						'https://github.com/hello-nrfcloud/proto/single-cell-geo-location',
					lat: 63.41999531,
					lng: 10.42999506,
					accuracy: 2420,
					ts: 1690378551538,
				},
				{
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/location',
					).toString(),
					lat: 63.41999531,
					lng: 10.42999506,
					acc: 2420,
					src: 'SCELL',
					ts: 1690378551538,
				},
			],
			[
				{
					...shadow.state,
					desired: {
						...shadow.state.desired,
						config: desiredConfig.state.desired.config,
					},
					version: desiredConfig.state.version,
				},
				objectMatching({
					'@context': new URL(
						'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/desiredConfiguration',
					).toString(),
					version: 73697,
					config: {
						nod: [],
						activeWaitTime: 120,
					},
					ts: getShadowUpdateTime(shadow.state.metadata) * 1000,
				}),
			],
		] as [
			message: Record<string, any>,
			transformed: ReturnType<typeof objectMatching>,
		][]) {
			void it(`should convert ${JSON.stringify(message)} to ${JSON.stringify(
				transformed,
			)} and validate it`, async () => {
				const onError = mock.fn()
				const res = await proto({ onError })('PCA20035+solar', message)
				console.log(res)
				console.log(onError.mock.calls[0])
				assert.equal(onError.mock.calls.length, 0)
				check(res).is(arrayContaining(transformed))
				// Test the validation
				const maybeValids = res.map(validator)
				check(maybeValids).is(
					arrayContaining(objectMatching({ value: transformed })),
				)
			})
		}
	})
	void describe('there are messages that are known, but currently not handled', () => {
		for (const message of [
			GROUND_FIX_REQUEST,
			GROUND_FIX_REQUEST2,
			GROUND_FIX_with_timeDiff,
		]) {
			void it(`should not handle ${JSON.stringify(message)}`, async () => {
				const onError = mock.fn()
				const res = await proto({ onError })('PCA20035+solar', message)
				assert.equal(onError.mock.calls.length, 0)
				assert.equal(res.length, 0)
			})
		}
	})
})

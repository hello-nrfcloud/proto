import type { Static } from '@sinclair/typebox'
import AIR_PRESS from '../nrfCloud/examples/deviceToCloud/AIR_PRESS.json' assert { type: 'json' }
import AIR_QUAL from '../nrfCloud/examples/deviceToCloud/AIR_QUAL.json' assert { type: 'json' }
import DEVICE from '../nrfCloud/examples/deviceToCloud/DEVICE-deviceInfo.json' assert { type: 'json' }
import HUMID from '../nrfCloud/examples/deviceToCloud/HUMID.json' assert { type: 'json' }
import RSRP from '../nrfCloud/examples/deviceToCloud/RSRP.json' assert { type: 'json' }
import TEMP from '../nrfCloud/examples/deviceToCloud/TEMP.json' assert { type: 'json' }
import shadow from '../nrfCloud/examples/shadow.json' assert { type: 'json' }
import type { DeviceIdentity } from './MuninnMessage'
import { proto } from './proto.js'
import deviceWithEnergyEstimate from './solarThingy/DEVICE-networkInfo-with-eest.json' assert { type: 'json' }
import location from './solarThingy/LOCATION.json' assert { type: 'json' }
import solar from './solarThingy/SOLAR.json' assert { type: 'json' }
import voltage from './solarThingy/VOLTAGE.json' assert { type: 'json' }
import { validPassthrough } from './validPassthrough.js'

describe('Muninn messages', () => {
	it('should validate a device identity message', () => {
		const deviceIdentityMessage: Static<typeof DeviceIdentity> = {
			'@context': 'https://github.com/bifravst/Muninn-proto/deviceIdentity',
			id: 'nrf-352656108602296',
			model: 'PCA20035+solar',
		}
		expect(validPassthrough(deviceIdentityMessage)).toMatchObject(
			deviceIdentityMessage,
		)
	})
	describe('PCA20035+solar: Thingy:91 with solar shield messages', () => {
		it.each([
			[
				shadow.state,
				{
					'@context': new URL(
						'https://github.com/bifravst/Muninn-proto/transformed/PCA20035%2Bsolar/reported',
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
							sdkVer: 'APP_VERSION',
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
				},
			],
			[
				solar,
				{
					'@context': new URL(
						'https://github.com/bifravst/Muninn-proto/transformed/PCA20035%2Bsolar/gain',
					).toString(),
					ts: solar.ts,
					mA: 3.123456,
				},
			],
			[
				voltage,
				{
					'@context': new URL(
						'https://github.com/bifravst/Muninn-proto/transformed/PCA20035%2Bsolar/voltage',
					).toString(),
					ts: voltage.ts,
					v: 4.085,
				},
			],
			[
				location,
				{
					'@context': new URL(
						'https://github.com/bifravst/Muninn-proto/transformed/PCA20035%2Bsolar/location',
					).toString(),
					ts: location.ts,
					lat: 45.524098,
					lng: -122.688408,
					acc: 200,
				},
			],
			[
				deviceWithEnergyEstimate,
				{
					'@context': new URL(
						'https://github.com/bifravst/Muninn-proto/transformed/PCA20035%2Bsolar/networkInfo',
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
				},
			],
			[
				RSRP,
				{
					ts: RSRP.ts,
					'@context': new URL(
						'https://github.com/bifravst/Muninn-proto/transformed/PCA20035%2Bsolar/rsrp',
					).toString(),
					rsrp: -96,
				},
			],
			[
				AIR_PRESS,
				{
					ts: AIR_PRESS.ts,
					'@context': new URL(
						'https://github.com/bifravst/Muninn-proto/transformed/PCA20035%2Bsolar/airPressure',
					).toString(),
					kPa: 102.31,
				},
			],
			[
				AIR_QUAL,
				{
					ts: AIR_QUAL.ts,
					'@context': new URL(
						'https://github.com/bifravst/Muninn-proto/transformed/PCA20035%2Bsolar/airQuality',
					).toString(),
					IAQ: 177,
				},
			],
			[
				DEVICE,
				{
					ts: DEVICE.ts,
					'@context': new URL(
						'https://github.com/bifravst/Muninn-proto/transformed/PCA20035%2Bsolar/deviceInfo',
					).toString(),
					imei: '350457794611739',
					iccid: '8931080620054223678',
					modemFirmware: 'mfw_nrf9160_1.3.3',
					board: 'thingy91_nrf9160',
					appVersion: '0.0.0-development',
				},
			],
			[
				TEMP,
				{
					ts: TEMP.ts,
					'@context': new URL(
						'https://github.com/bifravst/Muninn-proto/transformed/PCA20035%2Bsolar/airTemperature',
					).toString(),
					c: 25.73,
				},
			],
			[
				HUMID,
				{
					ts: HUMID.ts,
					'@context': new URL(
						'https://github.com/bifravst/Muninn-proto/transformed/PCA20035%2Bsolar/airHumidity',
					).toString(),
					p: 23.16,
				},
			],
		])(
			'should convert %j to %j and validate it',
			async (message, transformed) => {
				const onError = jest.fn().mockName('error callback')
				const res = await proto({ onError })('PCA20035+solar', message)
				expect(onError).not.toHaveBeenCalled()
				expect(res).toMatchObject([transformed])
				// Test the validation
				const maybeValid = validPassthrough(res[0])
				expect(maybeValid).not.toBeNull()
				expect(maybeValid).toMatchObject(transformed)
			},
		)
	})
})

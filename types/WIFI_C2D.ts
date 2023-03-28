/**
 * Responds with coordinates
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/cloudToDevice/wifi/wifi-position.json
 */
export type WIFI_C2D = Readonly<{
	appId: 'WIFI'
	messageType: 'DATA'
	data?: {
		/**
		 * GPS latitude
		 */
		lat?: number
		/**
		 * GPS longitude
		 */
		lon?: number
		/**
		 * HPE (horizontal positioning error) in meters
		 */
		uncertainty?: number
	}
	err?: number
}>

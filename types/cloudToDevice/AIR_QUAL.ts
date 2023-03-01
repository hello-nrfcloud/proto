/**
 * Set configuration values for the air quality module
 *
 * Direction: cloudToDevice
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/cloudToDevice/air_quality/air_quality.json
 */
export type AIR_QUAL = Readonly<{
	appId: 'AIR_QUAL'
	messageType: 'CFG_SET'
	data: {
		/**
		 * Boolean true to enable air quality reporting on the device, false to disable
		 */
		enable?: boolean
		/**
		 * Low threshold value. If set, device will only send data if it is below the threshold value
		 */
		thresh_lo?: number
		/**
		 * High threshold value. If set, device will only send data if it is above the threshold value
		 */
		thresh_hi?: number
	}
}>

/**
 * Sets configuration values for the temperature module
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/cloudToDevice/temp/temp.json
 */
export type TEMP_C2D = Readonly<{
	appId: 'TEMP'
	messageType: 'CFG_SET'
	data?: {
		/**
		 * Boolean true to enable temperature reporting on the device, false to disable
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

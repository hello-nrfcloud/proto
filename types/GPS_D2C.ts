/**
 * Sets configuration values for the GPS module
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/cloudToDevice/gps/gps.json
 */
export type GPS_D2C = Readonly<{
	appId: 'GPS'
	messageType: 'CFG_SET'
	data?: {
		/**
		 * Boolean true to enable GPS on the device, false to disable
		 */
		enable?: boolean
		/**
		 * Interval, in seconds, at which the device will send GPS data to the cloud. Data send disabled by setting to 0 or null
		 */
		interval?: number
	}
}>

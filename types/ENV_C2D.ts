/**
 * The environmental sensors module settings
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/cloudToDevice/env/env.json
 */
export type ENV_C2D = Readonly<{
	appId: 'ENV'
	messageType: 'CFG_SET'
	data: {
		/**
		 * Interval, in seconds, at which the device will send environmental data (temperature, humidity, air pressure, and air quality) to the cloud. Disabled by setting to 0 or null
		 */
		interval?: number
	}
}>

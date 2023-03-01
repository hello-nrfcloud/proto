/**
 * Sets configuration values for the light sensor module
 *
 * Direction: cloudToDevice
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/cloudToDevice/light/light.json
 */
export type LIGHT = Readonly<{
	appId: 'LIGHT'
	messageType: 'CFG_SET'
	data: {
		/**
		 * Boolean true to enable light sensor on the device, false to disable
		 */
		enable?: boolean
		/**
		 * Interval, in seconds, at which the device will send light sensor data (RGB and IR) to the cloud. Disabled by setting to 0 or null
		 */
		interval?: number
	}
}>

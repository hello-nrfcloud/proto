/**
 * Sets configuration values for the GPS module
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/gps/gps.json
 */
export type GPS = Readonly<{
	appId: string
	messageType: string
	data: {
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

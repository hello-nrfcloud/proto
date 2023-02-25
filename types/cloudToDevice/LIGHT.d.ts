/**
 * Sets configuration values for the light sensor module
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/light/light.json
 */
export type LIGHT = Readonly<{
	appId: string
	messageType: string
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

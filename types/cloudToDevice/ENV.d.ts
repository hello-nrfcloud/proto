/**
 * The environmental sensors module settings
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/env/env.json
 */
export type ENV = Readonly<{
	appId: string
	messageType: string
	data: {
		/**
		 * Interval, in seconds, at which the device will send environmental data (temperature, humidity, air pressure, and air quality) to the cloud. Disabled by setting to 0 or null
		 */
		interval?: number
	}
}>

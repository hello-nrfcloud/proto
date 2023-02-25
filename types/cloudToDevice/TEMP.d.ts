/**
 * Sets configuration values for the temperature module
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/temp/temp.json
 */
export type TEMP = Readonly<{
	appId: string
	messageType: string
	data: {
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

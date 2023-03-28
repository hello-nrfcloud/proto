/**
 * Sets configuration of the device's LED
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/cloudToDevice/led/led.json
 */
export type LED_C2D = Readonly<{
	appId: 'LED'
	messageType: 'CFG_SET'
	data: {
		/**
		 * RBG hex string specifying the desired LED color
		 */
		color?: string
	}
}>

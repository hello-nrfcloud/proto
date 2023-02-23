/**
 * Sets configuration of the device's LED
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/led/led.json
 */
export type LED = Readonly<{
	appId: string
	messageType: string
	data
}>

/**
 * The device's temperature sensor reading in Celsius
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/temp/temp.json
 */
export type TEMP = Readonly<{
	appId: string
	messageType: string
	data?: string
	ts?: number
	time?: number
}>

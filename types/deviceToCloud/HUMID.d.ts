/**
 * The device's humidity sensor
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/humid/humid.json
 */
export type HUMID = Readonly<{
	appId: string
	messageType: string
	data: string
	ts?: number
	time?: number
}>

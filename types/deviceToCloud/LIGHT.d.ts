/**
 * The light sensor on the device
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/light/light.json
 */
export type LIGHT = Readonly<{
	appId: string
	messageType: string
	data: string
	ts?: number
	time?: number
}>

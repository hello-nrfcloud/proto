/**
 * Responds with coordinates
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/wifi/wifi-position.json
 */
export type WIFI = Readonly<{
	appId: string
	messageType: string
	data?
	err?: number
}>

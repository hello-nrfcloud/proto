/**
 * WIFI request
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/wifi/wifi-position.json
 */
export type WIFI = Readonly<{
	appId?: string
	messageType?: string
	data?
}>

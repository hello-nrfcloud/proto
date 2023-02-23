/**
 * AGPS request
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/agps/agps.json
 */
export type AGPS = Readonly<{
	appId: string
	messageType: string
	data
}>

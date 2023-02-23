/**
 * Responds with error. Successful response is binary payload
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/agps/agps.json
 */
export type AGPS = Readonly<{
	appId: string
	messageType: string
	err: number
}>

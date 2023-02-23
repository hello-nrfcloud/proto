/**
 * IP device modem information
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/modem/modem.json
 */
export type MODEM = Readonly<{
	appId: string
	messageType: string
	data: string
}>

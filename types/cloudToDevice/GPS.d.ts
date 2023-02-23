/**
 * Sets configuration values for the GPS module
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/gps/gps.json
 */
export type GPS = Readonly<{
	appId: string
	messageType: string
	data?
}>

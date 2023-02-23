/**
 * Sets configuration values for the light sensor module
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/light/light.json
 */
export type LIGHT = Readonly<{
	appId: string
	messageType: string
	data
}>

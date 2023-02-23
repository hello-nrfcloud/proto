/**
 * Device meta-data containing network, sim, device, and service information
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/device/device.json
 */
export type DEVICE = Readonly<{
	appId: string
	messageType: string
	data
	ts?: number
	time?: number
}>

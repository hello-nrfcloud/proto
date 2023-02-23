/**
 * SCELL request
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/single_cell/single-cell.json
 */
export type SCELL = Readonly<{
	appId: string
	messageType: string
	data
}>

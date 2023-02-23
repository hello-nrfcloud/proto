/**
 * Responds with coordinates
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/single_cell/single-cell.json
 */
export type SCELL = Readonly<{
	appId: string
	messageType: string
	data?
	err?: number
}>

declare enum fulfilledWith {
	MCELL = 'MCELL',
	SCELL = 'SCELL',
}
/**
 * Responds with coordinates
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/cell_position/cell-position.json
 */
export type CELL_POS = Readonly<{
	appId: string
	messageType: string
	data: {
		/**
		 * GPS latitude
		 */
		lat?: number
		/**
		 * GPS longitude
		 */
		lon?: number
		/**
		 * HPE (horizontal positioning error) in meters
		 */
		uncertainty?: number
		/**
		 * How the request was fulfilled. MCELL if neighbor cells were used. SCELL if only serving cell.
		 */
		fulfilledWith?: fulfilledWith
	}
	err: number
}>

declare enum fulfilledWith {
	MCELL = 'MCELL',
	SCELL = 'SCELL',
}
/**
 * Responds with coordinates
 *
 * Direction: cloudToDevice
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/cloudToDevice/cell_position/cell-position.json
 */
export type CELL_POS = Readonly<{
	appId: 'CELL_POS'
	messageType: 'DATA'
	data?: {
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
	err?: number
}>

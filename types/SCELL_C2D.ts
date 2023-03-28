/**
 * Responds with coordinates
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/cloudToDevice/single_cell/single-cell.json
 */
export type SCELL_C2D = Readonly<{
	appId: 'SCELL'
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
	}
	err?: number
}>

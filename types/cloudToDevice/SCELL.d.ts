/**
 * Responds with coordinates
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/single_cell/single-cell.json
 */
export type SCELL = Readonly<{
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

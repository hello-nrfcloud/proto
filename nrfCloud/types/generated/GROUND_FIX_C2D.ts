declare enum fulfilledWith {
	MCELL = 'MCELL',
	SCELL = 'SCELL',
	WIFI = 'WIFI',
}
/**
 * Responds with coordinates
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/cloudToDevice/ground_fix/ground-fix.json
 */
export type GROUND_FIX_C2D = Readonly<{
	appId: 'GROUND_FIX'
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
		 * How the request was fulfilled. WIFI is prioritized by the cloud. Falls back to SCELL/MCELL.
		 */
		fulfilledWith?: fulfilledWith
	}
	err?: number
}>

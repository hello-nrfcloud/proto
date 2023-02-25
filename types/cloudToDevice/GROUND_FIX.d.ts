declare enum fulfilledWith {
	MCELL = 'MCELL',
	SCELL = 'SCELL',
	WIFI = 'WIFI',
}
declare enum fulfilledWith {
	MCELL = 'MCELL',
	SCELL = 'SCELL',
	WIFI = 'WIFI',
}
declare enum fulfilledWith {
	MCELL = 'MCELL',
	SCELL = 'SCELL',
	WIFI = 'WIFI',
}
declare enum fulfilledWith {
	MCELL = 'MCELL',
	SCELL = 'SCELL',
	WIFI = 'WIFI',
}
/**
 * Responds with coordinates
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/ground_fix/ground-fix.json
 */
export type GROUND_FIX = Readonly<{
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
		 * How the request was fulfilled. WIFI is prioritized by the cloud. Falls back to SCELL/MCELL.
		 */
		fulfilledWith?: fulfilledWith
	}
	err: number
}>

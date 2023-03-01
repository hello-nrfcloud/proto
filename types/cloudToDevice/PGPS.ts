/**
 * Responds with error. Successful response is documented in 'pgps' directory.
 *
 * Direction: cloudToDevice
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/cloudToDevice/pgps-error/pgps.json
 */
export type PGPS = Readonly<{
	appId: 'PGPS'
	messageType: 'DATA'
	err: number
}>

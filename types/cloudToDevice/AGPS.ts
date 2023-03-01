/**
 * Responds with error. Successful response is binary payload
 *
 * Direction: cloudToDevice
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/cloudToDevice/agps/agps.json
 */
export type AGPS = Readonly<{
	appId: 'AGPS'
	messageType: 'DATA'
	err: number
}>

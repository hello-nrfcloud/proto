export enum messageType {
	DATA = 'DATA',
}
/**
 * The device's temperature sensor reading in Celsius
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/deviceToCloud/temp/temp.json
 */
export type TEMP = Readonly<{
	appId: 'TEMP'
	messageType: messageType
	data: string
	/**
	 * Unix timestamp given in milliseconds when the data was sampled
	 */
	ts?: number
	/**
	 * The same as the 'ts' property. Used for backwards compatibility for some firmware versions of ATv2. Please use the 'ts' field instead
	 */
	time?: number
}>

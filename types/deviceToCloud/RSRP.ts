/**
 * Reference Signal Received Power
 *
 * Direction: deviceToCloud
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/deviceToCloud/rsrp/rsrp.json
 */
export type RSRP = Readonly<{
	appId: 'RSRP'
	messageType: 'DATA'
	/**
	 * RSRP dBm string
	 */
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

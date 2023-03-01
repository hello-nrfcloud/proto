/**
 * The device's air quality sensor data
 *
 * Direction: deviceToCloud
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/deviceToCloud/air_quality/air_quality.json
 */
export type AIR_QUAL = Readonly<{
	appId: 'AIR_QUAL'
	messageType: 'DATA'
	/**
	 * IAQ index value (0-500)
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

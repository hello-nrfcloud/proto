/**
 * The device's air pressure sensor in pascals (Pa)
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/deviceToCloud/air_press/air_press.json
 */
export type AIR_PRESS_D2C = Readonly<{
	appId: 'AIR_PRESS'
	messageType: 'DATA'
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

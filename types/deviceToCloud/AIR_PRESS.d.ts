/**
 * The device's air pressure sensor in pascals (Pa)
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/air_press/air_press.json
 */
export type AIR_PRESS = Readonly<{
	appId: string
	messageType: string
	data: string
	/**
	 * Unix timestamp given in milliseconds when the data was sampled
	 */
	ts: number
	/**
	 * The same as the 'ts' property. Used for backwards compatibility for some firmware versions of ATv2. Please use the 'ts' field instead
	 */
	time: number
}>

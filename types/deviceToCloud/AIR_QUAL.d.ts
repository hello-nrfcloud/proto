/**
 * The device's air quality sensor data
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/air_quality/air_quality.json
 */
export type AIR_QUAL = Readonly<{
	appId: string
	messageType: string
	/**
	 * IAQ index value (0-500)
	 */
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

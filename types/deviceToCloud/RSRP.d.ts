/**
 * Reference Signal Received Power
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/rsrp/rsrp.json
 */
export type RSRP = Readonly<{
	appId: string
	messageType: string
	/**
	 * RSRP dBm string
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

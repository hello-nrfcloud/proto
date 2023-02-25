declare enum messageType {
	DATA = 'DATA',
	HELLO = 'HELLO',
}
declare enum messageType {
	DATA = 'DATA',
	HELLO = 'HELLO',
}
/**
 * The device's temperature sensor reading in Celsius
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/temp/temp.json
 */
export type TEMP = Readonly<{
	appId: string
	messageType: messageType
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

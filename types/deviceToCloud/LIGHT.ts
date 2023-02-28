/**
 * The light sensor on the device
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/light/light.json
 */
export type LIGHT = Readonly<{
	appId: 'LIGHT'
	messageType: 'DATA'
	/**
	 * String of comma separated lux values (red, green, blue, IR)
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

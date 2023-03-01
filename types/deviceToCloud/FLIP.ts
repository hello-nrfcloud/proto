declare enum messageType {
	HELLO = 'HELLO',
	DATA = 'DATA',
}
declare enum data {
	NORMAL = 'NORMAL',
	UPSIDE_DOWN = 'UPSIDE_DOWN',
}
/**
 * The orientation of a device (normal or upside-down)
 *
 * Direction: deviceToCloud
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/deviceToCloud/flip/flip.json
 */
export type FLIP = Readonly<{
	appId: 'FLIP'
	messageType: messageType
	data?: data
	/**
	 * Unix timestamp given in milliseconds when the data was sampled
	 */
	ts?: number
	/**
	 * The same as the 'ts' property. Used for backwards compatibility for some firmware versions of ATv2. Please use the 'ts' field instead
	 */
	time?: number
}>

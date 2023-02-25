type accessPointsItem = Readonly<{
	/**
	 * String comprised of 6 hexadecimal pairs, separated by colons or dashes
	 */
	macAddress: string
	/**
	 * Name of Wi-Fi network
	 */
	ssid: string
	/**
	 * Signal strength in dBm
	 */
	signalStrength: number
	/**
	 * Channel frequency in MHz (only one of Channel or Frequency should be used)
	 */
	frequency: number
	/**
	 * Channel number (only one of Channel or Frequency should be used)
	 */
	channel: number
}>
/**
 * WIFI request
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/wifi/wifi-position.json
 */
export type WIFI = Readonly<{
	appId?: string
	messageType?: string
	data?: {
		/**
		 * At least two access points are required
		 */
		accessPoints: accessPointsItem[]
	}
}>

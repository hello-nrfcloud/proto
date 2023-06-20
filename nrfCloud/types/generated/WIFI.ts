type accessPointsItem = Readonly<{
	/**
	 * String comprised of 6 hexadecimal pairs, separated by colons or dashes
	 */
	macAddress: string
	/**
	 * Name of Wi-Fi network
	 */
	ssid?: string
	/**
	 * Signal strength in dBm
	 */
	signalStrength?: number
	/**
	 * Channel frequency in MHz (only one of Channel or Frequency should be used)
	 */
	frequency?: number
	/**
	 * Channel number (only one of Channel or Frequency should be used)
	 */
	channel?: number
}>
/**
 * WIFI request
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/deviceToCloud/wifi/wifi-position.json
 */
export type WIFI = Readonly<
	| {
			appId?: 'WIFI'
			messageType?: 'DATA'
			data: {
				/**
				 * Does not reply, even in event of an error, if set to false. Defaults to true.
				 */
				doReply?: boolean
				/**
				 * At least two access points are required
				 */
				accessPoints: accessPointsItem[]
			}
	  }
	| Record<string, any>
>

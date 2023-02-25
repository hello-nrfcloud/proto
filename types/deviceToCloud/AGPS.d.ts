declare enum types {
	n_1 = '1',
	n_2 = '2',
	n_3 = '3',
	n_4 = '4',
	n_5 = '5',
	n_6 = '6',
	n_7 = '7',
	n_8 = '8',
	n_9 = '9',
}
/**
 * AGPS request
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/agps/agps.json
 */
export type AGPS = Readonly<{
	appId: string
	messageType: string
	data: {
		/**
		 * Mobile Country Code
		 */
		mcc?: number
		/**
		 * Mobile Network Code
		 */
		mnc?: number
		/**
		 * Tracking Area Code
		 */
		tac?: number
		/**
		 * E-UTRA Cell Identifier
		 */
		eci?: number
		/**
		 * Signal power
		 */
		rsrp?: number
		/**
		 * Message Type. 1 = utc parameters, 2 = ephemerides data, 3 = almanac data, 4 = klobuchar ionospheric correction, 5 = nequick ionospheric correction, 6 = gps time of week, 7 = gps system clock, 8 = location (lat/lon of cell tower) 9 = gps integrity info
		 */
		types?: Array<types>
		/**
		 * If true, returns only ephemeris for visible satellites. Requires cell tower info.
		 */
		filtered?: boolean
		/**
		 * Filtered ephemeris mask angle. Only works in conjunction with the filtered flag. Controls the mask angle for which the satellites are filtered. Defaults to 5.
		 */
		mask?: number
	}
}>

declare enum format {
	json = 'json',
	binary = 'binary',
}
/**
 * SCELL request
 *
 * Direction: deviceToCloud
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/deviceToCloud/single_cell/single-cell.json
 */
export type SCELL = Readonly<{
	appId: 'SCELL'
	messageType: 'DATA'
	data: {
		/**
		 * Does not reply, even in event of an error, if set to false. Defaults to true.
		 */
		doReply?: boolean
		/**
		 * Mobile Country Code
		 */
		mcc: number
		/**
		 * Mobile Network Code
		 */
		mnc: number
		/**
		 * Tracking Area Code
		 */
		tac: number
		/**
		 * E-UTRA Cell Identifier
		 */
		eci: number
		/**
		 * Signal power
		 */
		rsrp?: number
		/**
		 * Requested format. Defaults to binary.
		 */
		format?: format
	}
}>

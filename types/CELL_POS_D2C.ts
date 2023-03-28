type nmrItem = Readonly<{
	/**
	 * Evolved Absolute Radio Frequency Channel (E-ARFCN).
	 */
	earfcn: number
	/**
	 * Physical Cell Identity (PCI).
	 */
	pci: number
	/**
	 * Signal power
	 */
	rsrp?: number
	/**
	 * Signal quality
	 */
	rsrq?: number
}>
type lteItem = Readonly<{
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
	 * Signal quality
	 */
	rsrq?: number
	/**
	 * Evolved Absolute Radio Frequency Channel (E-ARFCN).
	 */
	earfcn?: number
	nmr?: nmrItem[]
}>
/**
 * CELL_POS request
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/deviceToCloud/cell_position/cell-position.json
 */
export type CELL_POS_D2C = Readonly<{
	appId: 'CELL_POS'
	messageType: 'DATA'
	data: {
		/**
		 * Does not reply, even in event of an error, if set to false. Defaults to true.
		 */
		doReply?: boolean
		lte: lteItem[]
	}
}>

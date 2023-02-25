/**
 * CELL_POS request
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/cell_position/cell-position.json
 */
export type CELL_POS = Readonly<{
	appId: string
	messageType: string
	data: {
		/**
		 * Does not reply, even in event of an error, if set to false. Defaults to true.
		 */
		doReply: boolean
		lte: Array<{
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
			rsrp: number
			/**
			 * Signal quality
			 */
			rsrq: number
			/**
			 * Evolved Absolute Radio Frequency Channel (E-ARFCN).
			 */
			earfcn: number
			nmr: Array<{
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
				rsrp: number
				/**
				 * Signal quality
				 */
				rsrq: number
			}>
		}>
	}
}>

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
	/**
	 * Milliseconds that the neighbor cell was observed after the serving cell was observed. Improves accuracy for devices in motion.
	 */
	timeDiff?: number
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
	/**
	 * TimingAdvance: The length of time a signal takes to reach the base station from a mobile phone (half of rtt=round trip time). The units are symbols (Ts) as specified in 3GPP TS 36.211 (LTE). The expected resolution for nRF Cloud API is 1 Ts. Range 0..20512.
	 */
	adv?: number
	nmr?: nmrItem[]
}>
/**
 * GROUND_FIX request
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/deviceToCloud/ground_fix/ground-fix.json
 */
export type GROUND_FIX = Readonly<{
	appId: 'GROUND_FIX'
	messageType: 'DATA'
	data: {
		/**
		 * Does not reply, even in event of an error, if set to false. Defaults to true.
		 */
		doReply?: boolean
		wifi?: {
			/**
			 * At least two access points are required
			 */
			accessPoints: accessPointsItem[]
		}
		lte?: lteItem[]
	}
}>

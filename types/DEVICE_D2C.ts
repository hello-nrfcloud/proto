type uiItem = Readonly<string>
declare enum fota_v2 {
	APP = 'APP',
	MODEM = 'MODEM',
	BOOT = 'BOOT',
	BOOTLOADER = 'BOOTLOADER',
	SOFTDEVICE = 'SOFTDEVICE',
}
type fota_v2Item = Readonly<fota_v2>
/**
 * Device meta-data containing network, sim, device, and service information
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/deviceToCloud/device/device.json
 */
export type DEVICE_D2C = Readonly<{
	appId: 'DEVICE'
	messageType: 'DATA'
	data: {
		/**
		 * Device's connected network information
		 */
		networkInfo?: {
			currentBand: number
			supportedBands?: string
			areaCode: number
			/**
			 * Combination of the mobile country code and mobile network codes
			 */
			mccmnc: number
			ipAddress: string
			ueMode?: number
			cellID: number
			networkMode: string
			rsrp?: number
		}
		/**
		 * Device sim information
		 */
		simInfo?: {
			uiccMode: number
			iccid: string
			imsi: string
		}
		/**
		 * Data describing the device's application, firmware, and hardware versions
		 */
		deviceInfo?: {
			modemFirmware: string
			batteryVoltage?: number
			imei: string
			board: string
			appVersion: string
			appName?: string
			iccid?: string
		}
		/**
		 * Data describing the services provided by the devices for UI display on nRF Connect for Cloud.
		 */
		serviceInfo?: {
			/**
			 * List of application ids that let nRF Connect for Cloud know what cards to display before receiving messages. See schemas under device to cloud to see a list of supported application ids.
			 */
			ui: uiItem[]
			/**
			 * FOTA version 2. Includes a list of supported FOTA services. Supports nRFConnect for Cloud UI
			 */
			fota_v2?: fota_v2Item[]
		}
	}
	/**
	 * Unix timestamp given in milliseconds when the data was sampled
	 */
	ts?: number
	/**
	 * The same as the 'ts' property. Used for backwards compatibility for some firmware versions of ATv2. Please use the 'ts' field instead
	 */
	time?: number
}>

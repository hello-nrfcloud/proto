declare enum status {
	connected = 'connected',
	disconnected = 'disconnected',
}
declare enum state {
	paired = 'paired',
	not_associated = 'not_associated',
}
declare enum ui {
	GPS = 'GPS',
	TEMP = 'TEMP',
	HUMID = 'HUMID',
	AIR_PRESS = 'AIR_PRESS',
	FLIP = 'FLIP',
	RSRP = 'RSRP',
}
type uiItem = Readonly<ui>
declare enum fota_v2 {
	APP = 'APP',
	MODEM = 'MODEM',
	BOOT = 'BOOT',
	BOOTLOADER = 'BOOTLOADER',
	SOFTDEVICE = 'SOFTDEVICE',
}
type fota_v2Item = Readonly<fota_v2>
/**
 * The reported state of an IP device using AWS IoT Shadow (https://docs.aws.amazon.com/iot/latest/developerguide/iot-device-shadows.html).
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/deviceShadow/ipShadow/ipShadow.json
 */
export type ipShadow = Readonly<{
	/**
	 * The current state reported by the device
	 */
	reported: {
		/**
		 * The connected state of the device. AWS IoT provides MQTT lifecycle events see https://docs.aws.amazon.com/iot/latest/developerguide/life-cycle-events.html for more details.
		 */
		connection: {
			status: status
			keepalive?: number
			disconnectReason?: string
			clientInitiatedDisconnect?: boolean
		}
		/**
		 * The desired pairing state with nRFCloud Connect for Cloud
		 */
		pairing: {
			state: state
			/**
			 * MQTT device communication topic
			 */
			topics: {
				/**
				 * Communication topic from device to cloud
				 */
				d2c: string
				/**
				 * Communication topic from cloud to device
				 */
				c2d: string
			}
		}
		nrfcloud_mqtt_topic_prefix: string
		/**
		 * Device meta data
		 */
		device: {
			/**
			 * Device's connected network information
			 */
			networkInfo?: {
				currentBand: number
				supportedBands: string
				areaCode: number
				/**
				 * Combination of the mobile country code and mobile network codes
				 */
				mccmnc: string
				ipAddress: string
				ueMode: number
				cellID: number
				networkMode: string
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
				batteryVoltage: number
				imei: string
				board: string
				appVersion: string
				appName: string
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
		 * Client set device configuration.
		 */
		config?: {
			/**
			 * Enable GPS
			 */
			GPS?: {
				enable: boolean
			}
		}
	}
}>

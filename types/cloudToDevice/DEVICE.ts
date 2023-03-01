/**
 * Request from the cloud for the device to gracefully disconnect
 *
 * Direction: cloudToDevice
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/cloudToDevice/device/device.json
 */
export type DEVICE = Readonly<{
	appId: 'DEVICE'
	messageType: 'DISCON'
}>

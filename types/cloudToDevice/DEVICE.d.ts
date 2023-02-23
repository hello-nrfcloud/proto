/**
 * Request from the cloud for the device to gracefully disconnect
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/device/device.json
 */
export type DEVICE = Readonly<{
    "appId": string;
    "messageType": string;
}>;
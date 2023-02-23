/**
 * Device meta-data containing network, sim, device, and service information
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/device/device.json
 */
export type DEVICE = Readonly<{
    "appId": string;
    "messageType": string;
    "data": {
        "networkInfo"?: {
            "currentBand": number;
            "supportedBands": string;
            "areaCode": number;
            "mccmnc": string;
            "ipAddress": string;
            "ueMode": number;
            "cellID": number;
            "networkMode": string;
        };
        "simInfo"?: {
            "uiccMode": number;
            "iccid": string;
            "imsi": string;
        };
        "deviceInfo"?: {
            "modemFirmware": string;
            "batteryVoltage": number;
            "imei": string;
            "board": string;
            "appVersion": string;
            "appName": string;
        };
        "serviceInfo"?: {
            "ui": Array<string>;
            "fota_v2"?: Array<string>;
        };
    };
    "ts"?: number;
    "time"?: number;
}>;
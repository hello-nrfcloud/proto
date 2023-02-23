/**
 * Sets configuration values for the temperature module
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/temp/temp.json
 */
export type TEMP = Readonly<{
    "appId": string;
    "messageType": string;
    "data"?: {
        "enable"?: boolean;
        "thresh_lo"?: number;
        "thresh_hi"?: number;
    };
}>;
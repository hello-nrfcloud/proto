/**
 * Set configuration values for the air quality module
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/air_quality/air_quality.json
 */
export type AIR_QUAL = Readonly<{
    "appId": string;
    "messageType": string;
    "data": {
        "enable"?: boolean;
        "thresh_lo"?: number;
        "thresh_hi"?: number;
    };
}>;
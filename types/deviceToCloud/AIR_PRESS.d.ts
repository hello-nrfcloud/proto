/**
 * The device's air pressure sensor in pascals (Pa)
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/air_press/air_press.json
 */
export type AIR_PRESS = Readonly<{
    "appId": string;
    "messageType": string;
    "data": string;
    "ts"?: number;
    "time"?: number;
}>;
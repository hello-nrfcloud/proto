declare enum messageType {
    HELLO = "HELLO",
    DATA = "DATA"
}
declare enum data {
    NORMAL = "NORMAL",
    UPSIDE_DOWN = "UPSIDE_DOWN"
}
/**
 * The orientation of a device (normal or upside-down)
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/flip/flip.json
 */
export type FLIP = Readonly<{
    "appId": string;
    "messageType": messageType;
    "data"?: data;
    "ts"?: number;
    "time"?: number;
}>;
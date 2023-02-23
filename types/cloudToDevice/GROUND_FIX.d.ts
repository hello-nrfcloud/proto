declare enum fulfilledWith {
    MCELL = "MCELL",
    SCELL = "SCELL",
    WIFI = "WIFI"
}
/**
 * Responds with coordinates
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/ground_fix/ground-fix.json
 */
export type GROUND_FIX = Readonly<{
    "appId": string;
    "messageType": string;
    "data"?: {
        "lat"?: number;
        "lon"?: number;
        "uncertainty"?: number;
        "fulfilledWith"?: fulfilledWith;
    };
    "err"?: number;
}>;
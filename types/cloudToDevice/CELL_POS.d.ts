declare enum fulfilledWith {
    MCELL = "MCELL",
    SCELL = "SCELL"
}
/**
 * Responds with coordinates
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/cell_position/cell-position.json
 */
export type CELL_POS = Readonly<{
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
/**
 * CELL_POS request
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/cell_position/cell-position.json
 */
export type CELL_POS = Readonly<{
    "appId": string;
    "messageType": string;
    "data": {
        "doReply"?: boolean;
        "lte": Array<{
            "mcc": number;
            "mnc": number;
            "tac": number;
            "eci": number;
            "rsrp"?: number;
            "rsrq"?: number;
            "earfcn"?: number;
            "nmr"?: Array<{
                "earfcn": number;
                "pci": number;
                "rsrp"?: number;
                "rsrq"?: number;
            }>;
        }>;
    };
}>;
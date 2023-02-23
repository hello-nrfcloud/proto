/**
 * The environmental sensors module settings
 *
 * Direction: cloudToDevice
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/cloudToDevice/env/env.json
 */
export type ENV = Readonly<{
    "appId": string;
    "messageType": string;
    "data": {
        "interval"?: number;
    };
}>;
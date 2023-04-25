import { ipShadowMessage, messages } from '../generate/schema/messages.js'
import schema from '../schemas/NRFCloudMessage.schema.json'
import { validateWithJSONSchema } from '../validator/validateWithJSONSchema.js'
import type { NRFCloudMessage } from './types/NRFCloudMessage.js'
import { SOLAR, type TYPE as SOLAR_TYPE } from './types/solarThingy/SOLAR.js'
import {
	VOLTAGE,
	type TYPE as VOLTAGE_TYPE,
} from './types/solarThingy/VOLTAGE.js'

export const validator = validateWithJSONSchema<
	NRFCloudMessage | SOLAR_TYPE | VOLTAGE_TYPE
>(schema, [
	{
		$id: ipShadowMessage.$id.toString(),
		...ipShadowMessage.schema,
	},
	{
		$id: SOLAR.$id.toString(),
		...SOLAR.schema,
	},
	{
		$id: VOLTAGE.$id.toString(),
		...VOLTAGE.schema,
	},
	...messages.map(({ $id, schema }) => ({
		$id: $id.toString(),
		...schema,
	})),
])

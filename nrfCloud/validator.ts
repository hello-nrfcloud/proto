import { ipShadowMessage, messages } from '../generate/schema/messages.js'
import schema from '../schemas/NRFCloudMessage.schema.json' assert { type: 'json' }
import { validateWithJSONSchema } from '../validator/validateWithJSONSchema.js'
import type { NRFCloudMessage } from './types/NRFCloudMessage.js'
import {
	BATTERY,
	type TYPE as BATTERY_TYPE,
} from './types/solarThingy/BATTERY.js'
import { SOLAR, type TYPE as SOLAR_TYPE } from './types/solarThingy/SOLAR.js'

export const validator = validateWithJSONSchema<
	NRFCloudMessage | SOLAR_TYPE | BATTERY_TYPE
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
		$id: BATTERY.$id.toString(),
		...BATTERY.schema,
	},
	...messages.map(({ $id, schema }) => ({
		$id: $id.toString(),
		...schema,
	})),
])

import { Type } from '@sinclair/typebox'

export const ts = Type.Integer({
	description: `Timestamp as Unix epoch with millisecond precision (UTC)`,
	minimum: 1234567890123,
	examples: [1584533788029],
})

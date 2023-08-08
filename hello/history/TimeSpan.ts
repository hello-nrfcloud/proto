import { Type } from '@sinclair/typebox'

/**
 * Defines the time spans provided for historical data by the hello.nrfcloud.com backend.
 */
export const TimeSpan = Type.Union(
	['lastHour', 'lastDay', 'lastWeek', 'lastMonth'].map((s) => Type.Literal(s)),
)

import { Type } from '@sinclair/typebox'

/**
 * Defines the chart types provided by the hello.nrfcloud.com backend.
 */
export const ChartType = Type.Union(
	['lastHour', 'lastDay', 'lastMonth'].map((s) => Type.Literal(s)),
)

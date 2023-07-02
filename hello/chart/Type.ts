import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

const LastHour = Type.Object({
	bin: Type.Literal('1minute'),
	duration: Type.Literal('1hour'),
	expires: Type.Literal('1minute'),
})

const LastDay = Type.Object({
	bin: Type.Literal('5minutes'),
	duration: Type.Literal('24hours'),
	expires: Type.Literal('5minutes'),
})

const LastMonth = Type.Object({
	bin: Type.Literal('1hour'),
	duration: Type.Literal('30days'),
	aggregateRequired: Type.Literal(true),
	expires: Type.Literal('15minutes'),
})

/**
 * Defines the chart types provided by the hello.nrfcloud.com backend.
 */
export const ChartType = Type.Object({
	lastHour: LastHour,
	lastDay: LastDay,
	lastMonth: LastMonth,
})

export const AvailableCharts = Value.Create(ChartType)

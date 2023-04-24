import { Type } from '@sinclair/typebox'

export const ts = Type.Integer({
	minimum: 1000000000000,
	description: 'Unix timestamp in milliseconds',
})

export const messageType = Type.Literal('DATA')

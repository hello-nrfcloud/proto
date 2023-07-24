import { Type } from '@sinclair/typebox'

export const deviceId = Type.String({
	minLength: 1,
	description: 'the device ID',
	examples: ['nrf-352656108602296'],
})

import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'

export const ApiHealth = Type.Object(
	{
		'@context': Type.Literal(Context.apiHealth.toString()),
		version: Type.String({
			minLength: 1,
			title: 'Version',
			description: 'The version the backend is running.',
		}),
	},
	{
		title: 'ApiHealth',
	},
)

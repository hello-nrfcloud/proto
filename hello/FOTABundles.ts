import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import { deviceId } from './deviceId.js'

export const FOTABundle = Type.Object(
	{
		'@context': Type.Literal(Context.fotaBundle.toString()),
		bundleId: Type.String({
			minLength: 1,
			title: 'Bundle ID',
			description: 'The ID of the bundle.',
		}),
		version: Type.String({
			minLength: 1,
			title: 'Version',
			description: 'The version of the firmware contained in the bundle.',
		}),
		type: Type.String({
			minLength: 1,
			title: 'Type',
			description: 'The firmware type in the bundle.',
		}),
	},
	{
		title: 'FOTA Bundle',
		description: 'Describes a FOTA bundle.',
	},
)

export const FOTABundles = Type.Object(
	{
		'@context': Type.Literal(Context.fotaBundles.toString()),
		deviceId,
		bundles: Type.Array(FOTABundle, { minItems: 0 }),
	},
	{
		title: 'FOTA bundles',
		description: 'Lists the available FOTA bundles for a device.',
	},
)

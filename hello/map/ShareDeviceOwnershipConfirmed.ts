import { Type } from '@sinclair/typebox'
import { Context } from '../Context.js'
import { DeviceId } from './DeviceId.js'

export const ShareDeviceOwnershipConfirmed = Type.Object({
	'@context': Type.Literal(
		Context.map.shareDevice.ownershipConfirmed.toString(),
	),
	id: DeviceId,
})

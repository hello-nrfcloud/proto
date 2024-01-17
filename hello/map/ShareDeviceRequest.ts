import { Type } from '@sinclair/typebox'
import { Context } from '../Context.js'
import { PublicDeviceId } from './DeviceId.js'

export const ShareDeviceOwnershipConfirmed = Type.Object({
	'@context': Type.Literal(Context.map.shareDevice.request.toString()),
	id: PublicDeviceId,
})

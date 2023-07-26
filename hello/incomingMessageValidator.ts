import { Type } from '@sinclair/typebox'
import { validateWithTypeBox } from '../validator/validateWithTypeBox.js'
import { SingleCellGeoLocation } from './SingleCellGeoLocation.js'
import { DeviceIdentity } from './DeviceIdentity.js'

export const incomingMessageValidator = validateWithTypeBox(
	Type.Union([SingleCellGeoLocation, DeviceIdentity]),
)

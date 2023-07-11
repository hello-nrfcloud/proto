import { Type } from '@sinclair/typebox'
import { Battery, Gain, Location } from '../HelloMessage.js'

export const BatteryData = Type.Pick(Battery, ['%', 'ts'])

export const GainData = Type.Pick(Gain, ['mA', 'ts'])

export const LocationData = Type.Pick(Location, ['lat', 'lng', 'acc', 'ts'])

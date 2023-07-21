import { Type } from '@sinclair/typebox'
import { Gain } from '../Gain.js'
import { Location } from '../Location.js'
import { Battery } from '../Battery.js'

export const BatteryData = Type.Pick(Battery, ['%', 'ts'])

export const GainData = Type.Pick(Gain, ['mA', 'ts'])

export const LocationData = Type.Pick(Location, ['lat', 'lng', 'acc', 'ts'])

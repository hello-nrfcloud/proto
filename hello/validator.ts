import { validateWithTypeBox } from '../validator/validateWithTypeBox.js'
import { HelloMessage } from './HelloMessage.js'

export const validator = validateWithTypeBox(HelloMessage)

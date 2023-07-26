import { describe, test as it } from 'node:test'
import assert from 'node:assert'
import { ConfigureDevice, DeviceConfigured } from './ConfigureDevice.js'
import { validateWithTypeBox } from '../validator/validateWithTypeBox.js'
import { Context } from './Context.js'
import { randomUUID } from 'node:crypto'
import type { Static } from '@sinclair/typebox'

void describe('ConfigureDevice', () => {
	void it('show validate a device configuration request', () => {
		const id = randomUUID()
		const message: Static<typeof ConfigureDevice> = {
			'@context': Context.configureDevice.toString(),
			'@id': id,
			id: 'oob-352656108602296',
			configuration: {
				gnss: true,
			},
		}
		const maybeValid = validateWithTypeBox(ConfigureDevice)(message)
		assert.deepEqual('value' in maybeValid && maybeValid.value, message)
	})

	void it('show validate a device configuration result', () => {
		const id = randomUUID()
		const message: Static<typeof DeviceConfigured> = {
			'@context': Context.deviceConfigured.toString(),
			'@id': id,
			id: 'oob-352656108602296',
			configuration: {
				gnss: true,
			},
		}
		const maybeValid = validateWithTypeBox(DeviceConfigured)(message)
		assert.deepEqual('value' in maybeValid && maybeValid.value, message)
	})
})

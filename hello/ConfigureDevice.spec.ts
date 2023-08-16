import { describe, test as it } from 'node:test'
import assert from 'node:assert'
import { ConfigureDevice, DeviceConfigured } from './ConfigureDevice.js'
import { validateWithTypeBox } from '../validator/validateWithTypeBox.js'
import { Context } from './Context.js'
import { randomUUID } from 'node:crypto'
import type { Static } from '@sinclair/typebox'

void describe('ConfigureDevice', () => {
	void describe('validate device configuration requests', () => {
		for (const configuration of [
			{
				gnss: true,
			},
			{
				updateIntervalSeconds: 120,
			},
			{
				updateIntervalSeconds: 600,
				gnss: false,
			},
		] as Static<typeof ConfigureDevice>['configuration'][]) {
			void it('', () => {
				const id = randomUUID()
				const message: Static<typeof ConfigureDevice> = {
					'@context': Context.configureDevice.toString(),
					'@id': id,
					id: 'oob-352656108602296',
					configuration,
				}
				const maybeValid = validateWithTypeBox(ConfigureDevice)(message)
				assert.deepEqual('value' in maybeValid && maybeValid.value, message)
			})
		}
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

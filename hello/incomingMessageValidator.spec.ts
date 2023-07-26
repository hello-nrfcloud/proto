import { describe, test as it } from 'node:test'
import assert from 'node:assert/strict'
import { incomingMessageValidator } from './incomingMessageValidator.js'

void describe('incomingMessageValidator()', () => {
	for (const deviceIdentityMessage of [
		{
			'@context': 'https://github.com/hello-nrfcloud/proto/deviceIdentity',
			id: 'nrf-352656108602296',
			model: 'PCA20035+solar',
		},
		{
			'@context': 'https://github.com/hello-nrfcloud/proto/deviceIdentity',
			id: 'nrf-352656108602296',
			model: 'PCA20035+solar',
			lastSeen: new Date().toISOString(),
		},
	]) {
		void it(`should validate the device identity message ${JSON.stringify(
			deviceIdentityMessage,
		)}`, () =>
			assert.deepEqual(incomingMessageValidator(deviceIdentityMessage), {
				value: deviceIdentityMessage,
			}))
	}
})

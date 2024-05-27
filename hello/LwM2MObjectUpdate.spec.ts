import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { LwM2MObjectUpdate } from './LwM2MObjectUpdate.js'
import type { Static } from '@sinclair/typebox'
import { validateWithTypeBox } from 'validator/validateWithTypeBox.js'

void describe('LwM2MObjectUpdate', () => {
	void it('should validate', () => {
		const input: Static<typeof LwM2MObjectUpdate> = {
			'@context': 'https://github.com/hello-nrfcloud/proto/lwm2m/object/update',
			ObjectID: 14201,
			ObjectVersion: '1.0',
			ObjectInstanceID: 0,
			Resources: {
				'0': 70.374978,
				'1': 31.104015,
				'3': 1,
				'6': 'Fixed',
				'99': new Date('2024-04-19T08:30:00.000Z').getTime(),
			},
		}
		const maybeValid = validateWithTypeBox(LwM2MObjectUpdate)(input)
		assert.equal('errors' in maybeValid, false)
		assert.deepEqual('value' in maybeValid && maybeValid.value, input)
	})
})

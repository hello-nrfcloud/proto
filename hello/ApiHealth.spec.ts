import type { Static } from '@sinclair/typebox'
import assert from 'node:assert'
import { describe, test as it } from 'node:test'
import { validateWithTypeBox } from '../validator/validateWithTypeBox.js'
import { ApiHealth } from './ApiHealth.js'
import { Context } from './Context.js'

void describe('ApiHealth', () => {
	void describe('validate device configuration requests', () => {
		void it('should validate', () => {
			const message: Static<typeof ApiHealth> = {
				'@context': Context.apiHealth.toString(),
				version: '0.0.0-development',
			}
			const maybeValid = validateWithTypeBox(ApiHealth)(message)
			assert.deepEqual('value' in maybeValid && maybeValid.value, message)
		})
	})
})

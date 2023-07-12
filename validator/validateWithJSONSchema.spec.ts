import { validateWithJSONSchema } from './validateWithJSONSchema.js'
import { describe, test as it } from 'node:test'
import assert from 'node:assert/strict'

const typedInputSchema = {
	type: 'object',
	properties: {
		cell: {
			type: 'number',
			minimum: 1,
		},
	},
	additionalProperties: false,
}

void describe('validateWithJSONSchema', () => {
	void describe('it should validate', () => {
		const v = validateWithJSONSchema(typedInputSchema)
		void it('valid input', () => {
			const isValid = v({ cell: 42 })
			assert.equal('value' in isValid, true)
			assert.equal((isValid as any).value.cell, 42)
		})
		void it('invalid input', () => {
			const isInvalid = v({ cell: -42 })
			assert.equal('errors' in isInvalid, true)
		})
	})
})

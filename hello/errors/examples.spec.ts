import { validateWithTypeBox } from '../../validator/validateWithTypeBox.js'
import { ProblemDetail } from './ProblemDetail.js'
import BAD_REQUEST from './examples/BAD_REQUEST.json' assert { type: 'json' }
import INTERNAL_ERROR from './examples/INTERNAL_ERROR.json' assert { type: 'json' }

import { describe, test as it } from 'node:test'
import assert from 'node:assert/strict'
void describe('Error example messages', () => {
	const validator = validateWithTypeBox(ProblemDetail)

	for (const example of [BAD_REQUEST, INTERNAL_ERROR]) {
		void it(`should validate error ${JSON.stringify(example)}`, () => {
			const result = validator(example)
			assert.equal('errors' in result, false)
		})
	}
})

import type { Static } from '@sinclair/typebox'
import { validPassthrough } from '../validPassthrough.js'
import type { ProblemDetail } from './ProblemDetail.js'
import BAD_REQUEST from './examples/BAD_REQUEST.json' assert { type: 'json' }
import INTERNAL_ERROR from './examples/INTERNAL_ERROR.json' assert { type: 'json' }

describe('Error example messages', () => {
	it.each([BAD_REQUEST, INTERNAL_ERROR])(
		'should validate message %j',
		(example) => {
			const result = validPassthrough(
				example as Static<typeof ProblemDetail>,
				(_, error) => console.error(JSON.stringify(error)),
			)
			expect(result).not.toBeNull()
		},
	)
})

import { validateWithTypeBox } from '../../validator/validateWithTypeBox.js'
import { ProblemDetail } from './ProblemDetail.js'
import BAD_REQUEST from './examples/BAD_REQUEST.json' assert { type: 'json' }
import INTERNAL_ERROR from './examples/INTERNAL_ERROR.json' assert { type: 'json' }

describe('Error example messages', () => {
	const validator = validateWithTypeBox(ProblemDetail)

	it.each([BAD_REQUEST, INTERNAL_ERROR])(
		'should validate message %j',
		(example) => {
			const result = validator(example)
			expect(result).not.toHaveProperty('errors')
		},
	)
})

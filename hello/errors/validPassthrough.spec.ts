import { validPassthrough } from './validPassthrough.js'

describe('validPassthrough', () => {
	it('should let valid input pass', () => {
		const isValid = validPassthrough({
			'@context': 'https://github.com/hello-nrfcloud/proto/ProblemDetail',
			'@id': '55480460-6b90-4e81-a875-a1b09f72c877',
			type: 'https://hello.nrfcloud.com/errors/BadRequest',
			title: 'Validation error',
			status: 400,
		})
		expect(isValid).toMatchObject({
			'@context': 'https://github.com/hello-nrfcloud/proto/ProblemDetail',
			'@id': '55480460-6b90-4e81-a875-a1b09f72c877',
			type: 'https://hello.nrfcloud.com/errors/BadRequest',
			title: 'Validation error',
			status: 400,
		})
	})

	it('should not let invalid input pass', () => {
		const onDropped = jest.fn()
		const isInvalid = validPassthrough({ temp: -42 } as any, onDropped)
		expect(isInvalid).toBeNull()
		expect(onDropped).toHaveBeenCalledWith(
			{ temp: -42 },
			expect.objectContaining([
				{
					instancePath: '',
					keyword: 'required',
					message: "must have required property '@context'",
					params: { missingProperty: '@context' },
					schemaPath: '#/required',
				},
			]),
		)
	})
})

import { validPassthrough } from './validPassthrough.js'

describe('validPassthrough', () => {
	it('should let valid input pass', () => {
		const isValid = validPassthrough({
			'@context':
				'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/airHumidity',
			p: 23.16,
			ts: 1681985384511,
		})
		expect(isValid).toMatchObject({
			'@context':
				'https://github.com/hello-nrfcloud/proto/transformed/PCA20035%2Bsolar/airHumidity',
			p: 23.16,
			ts: 1681985384511,
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
					schemaPath: '#/anyOf/0/required',
				},
			]),
		)
	})
})

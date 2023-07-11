import { validPassthrough } from './validPassthrough.js'

describe('validPassthrough', () => {
	it('should let valid input pass', () => {
		const isValid = validPassthrough({
			'@context':
				'https://github.com/hello-nrfcloud/proto/historical-data-request',
			'@id': '98431ad8-8259-4415-90fe-8d4f315ec601',
			type: 'lastHour',
			message: 'gain',
			attributes: {
				avgMA: { attribute: 'mA', aggregate: 'avg' },
			},
		})
		expect(isValid).toMatchObject({
			'@context':
				'https://github.com/hello-nrfcloud/proto/historical-data-request',
			'@id': '98431ad8-8259-4415-90fe-8d4f315ec601',
			type: 'lastHour',
			message: 'gain',
			attributes: {
				avgMA: { attribute: 'mA', aggregate: 'avg' },
			},
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
					schemaPath: '#/anyOf/0/anyOf/0/required',
				},
			]),
		)
	})
})

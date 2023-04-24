import { validPassthrough } from './validPassthrough.js'

describe('validPassthrough', () => {
	it('should let valid input pass', () => {
		const isValid = validPassthrough({
			appId: 'TEMP',
			messageType: 'DATA',
			ts: 1676366336476,
			data: '25.73',
		})
		expect(isValid).toMatchObject({
			appId: 'TEMP',
			messageType: 'DATA',
			ts: 1676366336476,
			data: '25.73',
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
					message: "must have required property 'data'",
					params: { missingProperty: 'data' },
					schemaPath: '#/required',
				},
			]),
		)
	})
})

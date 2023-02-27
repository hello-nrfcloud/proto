import { validPassthrough } from './validPassthrough.js'

describe('validPassthrough', () => {
	describe('it should validate', () => {
		it('valid input', () => {
			const isValid = validPassthrough({
				sender: 'nrf-350457794611739',
				topic: 'data/m/d/nrf-350457794611739/d2c',
				payload: {
					appId: 'TEMP',
					messageType: 'DATA',
					ts: 1676366336476,
					data: '25.73',
				},
			})
			expect(isValid).toMatchObject({
				sender: 'nrf-350457794611739',
				topic: 'data/m/d/nrf-350457794611739/d2c',
				payload: {
					appId: 'TEMP',
					messageType: 'DATA',
					ts: 1676366336476,
					data: '25.73',
				},
			})
		})
		it('invalid input', () => {
			const isInvalid = validPassthrough({ temp: -42 } as any)
			expect(isInvalid).toBeUndefined()
		})
	})
})

import { isoDateRegExp } from './isoDateRegExp.js'

describe('isoDateRegExp', () => {
	it('should match a date string', () => {
		const isoTs = new Date().toISOString()
		expect(isoDateRegExp.test(isoTs)).toEqual(true)
	})
})

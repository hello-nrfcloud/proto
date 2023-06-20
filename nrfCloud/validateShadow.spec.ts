import { ipShadowMessage } from '../generate/schema/messages.js'
import { validateWithJSONSchema } from '../validator/validateWithJSONSchema.js'
import exampleShadow from './examples/shadow.json' assert { type: 'json' }
import type { ipShadow } from './types/types'

describe('validate the shadow', () => {
	it('should validate the shadow', async () => {
		const shadow: ipShadow = exampleShadow.state

		const validator = validateWithJSONSchema<ipShadow>({
			$id: ipShadowMessage.$id.toString(),
			...ipShadowMessage.schema,
		})
		const res = validator(shadow)
		expect(res).toMatchObject({ value: shadow })
	})
})

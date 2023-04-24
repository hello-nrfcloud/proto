import { proto, validPassthrough } from '@nrf-guide/proto/nrfGuide'
import assert from 'node:assert'

// Convert nRF Cloud message to nRF Guide format
const converted = await proto()('PCA20035+solar', {
	appId: 'SOLAR',
	messageType: 'DATA',
	ts: 1681985624779,
	data: '3.897601',
})

// multiple conversions may have been applied
const convertedMessage = converted[0]

assert.equal(
	JSON.stringify(convertedMessage),
	JSON.stringify({
		'@context': `https://github.com/bifravst/nRF-Guide-proto/transformed/PCA20035%2Bsolar/gain`,
		mA: 3.897601,
		ts: 1681985624779,
	}),
)

// Validate nRF Guide format
const maybeValid = validPassthrough(convertedMessage, (v, errors) => {
	console.error(errors)
})
assert.equal(maybeValid, convertedMessage)

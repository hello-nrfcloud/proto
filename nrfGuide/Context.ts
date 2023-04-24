import { parse } from 'node:url'
import { repository } from '../package.json'

const baseContext = parse(repository.url)
const baseURL = `https://${baseContext.host}${baseContext.path?.replace(
	'.git',
	'',
)}`

export const Context = {
	deviceIdentity: new URL(`${baseURL}/deviceIdentity`),
	model: (
		model: string,
	): {
		transformed: (transformerId: string) => URL
	} => ({
		transformed: (transformerId) =>
			new URL(
				`${baseURL}/transformed/${encodeURIComponent(
					model,
				)}/${encodeURIComponent(transformerId)}`,
			),
	}),
}

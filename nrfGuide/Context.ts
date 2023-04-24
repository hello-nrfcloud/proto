import { parse } from 'node:url'
import { repository } from '../package.json'

const baseContext = parse(repository.url)
export const transformed = ({
	model,
	transformerId,
}: {
	model: string
	transformerId: string
}): URL =>
	new URL(
		`https://${baseContext.host}${baseContext.path?.replace(
			'.git',
			'',
		)}/transformed/${encodeURIComponent(model)}/${encodeURIComponent(
			transformerId,
		)}`,
	)

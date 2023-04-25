const baseURL = `https://github.com/bifravst/nRF-Guide-proto`

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
const baseURL = `https://github.com/hello-nrfcloud/proto`

export const Context = {
	deviceIdentity: new URL(`${baseURL}/deviceIdentity`),
	historicalDataRequest: new URL(`${baseURL}/historical-data-request`),
	historicalDataResponse: new URL(`${baseURL}/historical-data-response`),
	problemDetail: new URL(`${baseURL}/ProblemDetail`),
	error: (type: string): URL =>
		new URL(`https://hello.nrfcloud.com/errors/${type}`),
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

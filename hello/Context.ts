const baseURL = `https://github.com/hello-nrfcloud/proto`

export const Context = {
	deviceIdentity: new URL(`${baseURL}/deviceIdentity`),
	historicalDataRequest: new URL(`${baseURL}/historical-data-request`),
	historicalDataResponse: new URL(`${baseURL}/historical-data-response`),
	singleCellGeoLocation: new URL(`${baseURL}/single-cell-geo-location`),
	configureDevice: new URL(`${baseURL}/configure-device`),
	deviceConfigured: new URL(`${baseURL}/device-configured`),
	problemDetail: new URL(`${baseURL}/ProblemDetail`),
	lwm2mObjectUpdate: new URL(`${baseURL}/lwm2m/object/update`),
	error: (type: string): URL =>
		new URL(`https://hello.nrfcloud.com/errors/${type}`),
	/**
	 * @deprecated See https://github.com/hello-nrfcloud/proto/issues/137
	 */
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

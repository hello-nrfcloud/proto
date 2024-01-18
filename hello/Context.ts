const baseURL = `https://github.com/hello-nrfcloud/proto`

export const Context = {
	deviceIdentity: new URL(`${baseURL}/deviceIdentity`),
	historicalDataRequest: new URL(`${baseURL}/historical-data-request`),
	historicalDataResponse: new URL(`${baseURL}/historical-data-response`),
	singleCellGeoLocation: new URL(`${baseURL}/single-cell-geo-location`),
	configureDevice: new URL(`${baseURL}/configure-device`),
	deviceConfigured: new URL(`${baseURL}/device-configured`),
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
	// Sharing
	map: {
		device: new URL(`${baseURL}/map/device`),
		devices: new URL(`${baseURL}/map/devices`),
		shareDevice: {
			request: new URL(`${baseURL}/map/share-device-request`),
			ownershipConfirmed: new URL(
				`${baseURL}/map/share-device-ownership-confirmed`,
			),
		},
	},
}

const baseURL = `https://github.com/hello-nrfcloud/proto`

export const Context = {
	deviceIdentity: new URL(`${baseURL}/deviceIdentity`),
	historicalDataRequest: new URL(`${baseURL}/historical-data-request`),
	historicalDataResponse: new URL(`${baseURL}/historical-data-response`),
	singleCellGeoLocation: new URL(`${baseURL}/single-cell-geo-location`),
	configureDevice: new URL(`${baseURL}/configure-device`),
	problemDetail: new URL(`${baseURL}/ProblemDetail`),
	lwm2mObjectUpdate: new URL(`${baseURL}/lwm2m/object/update`),
	senMLImports: new URL(`${baseURL}/senml/imports`),
	shadow: new URL(`${baseURL}/shadow`),
	apiHealth: new URL(`${baseURL}/api/health`),
	error: (type: string): URL =>
		new URL(`https://hello.nrfcloud.com/errors/${type}`),
}

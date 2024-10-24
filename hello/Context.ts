const baseURL = `https://github.com/hello-nrfcloud/proto`

export const Context = {
	deviceIdentity: new URL(`${baseURL}/deviceIdentity`),
	historicalDataRequest: new URL(`${baseURL}/historical-data-request`),
	historicalDataResponse: new URL(`${baseURL}/historical-data-response`),
	problemDetail: new URL(`${baseURL}/ProblemDetail`),
	lwm2mObjectUpdate: new URL(`${baseURL}/lwm2m/object/update`),
	lwm2mObjectHistory: new URL(`${baseURL}/lwm2m/object/history`),
	senMLImports: new URL(`${baseURL}/senml/imports`),
	shadow: new URL(`${baseURL}/shadow`),
	apiHealth: new URL(`${baseURL}/api/health`),
	fotaBundles: new URL(`${baseURL}/fota/bundles`),
	fotaBundle: new URL(`${baseURL}/fota/bundle`),
	fotaJob: new URL(`${baseURL}/fota/job`),
	fotaJobs: new URL(`${baseURL}/fota/jobs`),
	error: (type: string): URL =>
		new URL(`https://hello.nrfcloud.com/errors/${type}`),
}

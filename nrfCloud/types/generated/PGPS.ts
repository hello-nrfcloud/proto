/**
 * PGPS request
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/deviceToCloud/pgps/pgps.json
 */
export type PGPS = Readonly<{
	appId: 'PGPS'
	messageType: 'DATA'
	data: {
		/**
		 * GPS day to start the predictions.
		 */
		startGpsDay?: number
		/**
		 * Time of day (in seconds) to start collecting the GPS predictions.
		 */
		startGpsTimeOfDaySeconds?: number
		/**
		 * Number of GPS predictions (4 hour periods) to return. There are 6 predictions per day. You can request up to 14 days.
		 */
		predictionCount?: number
		/**
		 * The interval (in minutes) at which predictions are spaced.
		 */
		predictionIntervalMinutes?: number
	}
}>

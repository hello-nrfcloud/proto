/**
 * GNSS device coordinate data
 *
 * Direction: deviceToCloud
 *
 * @see https://github.com/nRFCloud/application-protocols/tree/v1/schemas/deviceToCloud/gnss/gnss.json
 */
export type GNSS = Readonly<
	| {
			appId: string
			messageType: string
			/**
			 * NMEA string
			 */
			data: string
			/**
			 * Unix timestamp given in milliseconds when the data was sampled
			 */
			ts: number
			/**
			 * The same as the 'ts' property. Used for backwards compatibility for some firmware versions of ATv2. Please use the 'ts' field instead
			 */
			time: number
	  }
	| {
			appId: string
			messageType: string
			/**
			 * Position, Velocity and Time (PVT) payload
			 */
			data: {
				/**
				 * latitude
				 */
				lat: number
				/**
				 * longitude
				 */
				lng: number
				/**
				 * Accuracy in (2D 1-sigma) in meters
				 */
				acc: number
				/**
				 * Horizontal speed in meters per second
				 */
				spd: number
				/**
				 * Heading of movement in degrees
				 */
				hdg: number
				/**
				 * Altitude above WGS-84 ellipsoid in meters
				 */
				alt: number
			}
			/**
			 * Unix timestamp given in milliseconds when the data was sampled
			 */
			ts: number
			/**
			 * The same as the 'ts' property. Used for backwards compatibility for some firmware versions of asset_tracker_v2. Please use the 'ts' field instead
			 */
			time: number
	  }
>

/**
 * IP device modem information
 *
 * Direction: cloudToDevice
 *
 * @see https://raw.githubusercontent.com/bifravst/nrfcloud-application-protocols/v1-asset_tracker_v2-fixes/schemas/cloudToDevice/modem/modem.json
 */
export type MODEM = Readonly<{
	appId: 'MODEM'
	messageType: 'CMD'
	/**
	 * AT command to be sent to the modem. See the [docs](https://infocenter.nordicsemi.com/index.jsp?topic=%2Fref_at_commands%2FREF%2Fat_commands%2Fintro.html) for the list of supported commands
	 */
	data: string
}>

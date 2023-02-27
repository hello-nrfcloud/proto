import type { NRFCloudMessage } from './NRFCloudMessage'

/**
 * Envelope schema for nRF Cloud application messages
 *
 * All messages received from nRF Cloud via MQTT are wrapped in this envelope
 */
export type NRFCloudMessageEnvelope = {
	sender: string
	topic: string
	payload: NRFCloudMessage
}

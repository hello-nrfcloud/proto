import { FOTAJobTarget } from './FOTAJob.js'

export const bundleIdToType = (bundleId: string): FOTAJobTarget | null => {
	const type = bundleId.split('*')[0]
	switch (type) {
		case 'APP':
			return FOTAJobTarget.application
		case 'MODEM':
		case 'MDM_FULL':
			return FOTAJobTarget.modem
		default:
			return null
	}
}

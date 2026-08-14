import { FOTAJobTarget } from './FOTAJob.ts'

export const bundleIdToType = (bundleId: string): FOTAJobTarget | null => {
	const type = bundleId.split('*')[0]
	switch (type) {
		case 'APP':
			return FOTAJobTarget.application
		case 'MODEM':
		case 'MDM_FULL':
			return FOTAJobTarget.modem
		case undefined:
		default:
			return null
	}
}

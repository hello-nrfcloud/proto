import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import { IsoDateType } from './IsoDateType.js'
import { deviceId } from './deviceId.js'

export enum FOTAJobStatus {
	NEW = 'NEW',
	IN_PROGRESS = 'IN_PROGRESS',
	SUCCEEDED = 'SUCCEEDED',
	FAILED = 'FAILED',
}

export enum FOTAJobTarget {
	application = 'app',
	modem = 'modem',
}

export const UpgradePath = Type.Record(
	Type.RegExp(/[0-9]+\.[0-9]+\.[0-9]+/, {
		title: 'Version',
		description: 'The version the bundle is targeting',
	}),
	Type.RegExp(
		/^(APP|MODEM|BOOT|SOFTDEVICE|BOOTLOADER|MDM_FULL)\*[0-9a-zA-Z]{8}\*.*$/,
		{
			title: 'Bundle ID',
			description: 'The nRF Cloud firmware bundle ID',
		},
	),
	{ minProperties: 1 },
)

export const FOTAJob = Type.Object(
	{
		'@context': Type.Literal(Context.fotaJob.toString()),
		id: Type.String({
			minLength: 1,
			title: 'ID',
			description: 'The ID of the job.',
		}),
		deviceId,
		upgradePath: UpgradePath,
		timestamp: IsoDateType(
			'Time formatted as ISO 8601 string when the job was last updated.',
		),
		status: Type.Enum(FOTAJobStatus, {
			description: 'the status of the job',
		}),
		statusDetail: Type.String({
			minLength: 1,
			title: 'Status Detail',
			description: 'Detailed information about the current status',
		}),
		reportedVersion: Type.String({
			minLength: 1,
			title: 'reported version',
			description:
				'The version of the target firmware that the device has reported.',
		}),
	},
	{
		title: 'FOTAJob',
		description: `Keeps track of the FOTA execution for a device's application or modem firmware that involves one or more sequential firmware updates.`,
	},
)

export const FOTAJobs = Type.Object(
	{
		'@context': Type.Literal(Context.fotaJobs.toString()),
		deviceId,
		jobs: Type.Array(FOTAJob, { minItems: 0 }),
	},
	{
		title: 'FOTA jobs',
		description: 'Lists the most recent FOTA jobs for a device.',
	},
)

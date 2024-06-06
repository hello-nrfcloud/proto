import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import { IsoDateType } from './IsoDateType.js'
import { deviceId } from './deviceId.js'

export const FOTAJobExecution = Type.Object(
	{
		'@context': Type.Literal(Context.fotaJobExecution.toString()),
		id: Type.String({
			minLength: 1,
			title: 'ID',
			description: 'The ID of the job.',
		}),
		deviceId,
		lastUpdatedAt: IsoDateType(
			'Time formatted as ISO 8601 string when the job was last updated.',
		),
		status: Type.String({
			minLength: 1,
			description: 'the status of the job',
			examples: [
				'CREATED',
				'IN_PROGRESS',
				'CANCELLED',
				'DELETION_IN_PROGRESS',
				'COMPLETED',
			],
		}),
		statusDetail: Type.Optional(
			Type.String({
				minLength: 1,
				title: 'Status Detail',
				description: 'Detailed information about the current status',
			}),
		),
		version: Type.String({
			minLength: 1,
			title: 'Version',
			description: 'The version of the firmware that the job is targeting.',
		}),
	},
	{
		title: 'FOTAJobExecution',
	},
)

export const FOTAJobExecutions = Type.Object(
	{
		'@context': Type.Literal(Context.fotaJobExecutions.toString()),
		deviceId,
		jobs: Type.Array(FOTAJobExecution, { minItems: 0 }),
	},
	{
		title: 'FOTA jobs',
		description: 'Lists the most recent FOTA jobs for a device.',
	},
)

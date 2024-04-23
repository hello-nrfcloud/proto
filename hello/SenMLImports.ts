import { Type } from '@sinclair/typebox'
import { Context } from './Context.js'
import { deviceId } from './deviceId.js'
import { IsoDateType } from './IsoDateType.js'
import {
	ObjectID,
	ObjectInstanceID,
	ObjectVersion,
	Resources,
} from '@hello.nrfcloud.com/proto-map/api'

export const SenMLImport = Type.Object({
	importId: Type.String({
		minLength: 1,
		title: 'Import ID',
		description: 'The Ulid for the import',
		examples: ['01ARZ3NDEKTSV4RRFFQ69G5FAV'],
	}),
	timestamp: IsoDateType('The timestamp when the update was received.'),
	success: Type.Boolean({
		title: 'Success',
		description: 'Whether the processing succeeded.',
	}),
	senML: Type.Record(Type.String({ minLength: 1 }), Type.Any(), {
		title: 'SenML',
		description: 'The imported SenML',
	}),
	lwm2m: Type.Optional(
		Type.Array(
			Type.Object({
				ObjectID,
				ObjectInstanceID: Type.Optional(ObjectInstanceID),
				ObjectVersion: Type.Optional(ObjectVersion),
				Resources,
			}),
		),
	),
})

export const SenMLImports = Type.Object(
	{
		'@context': Type.Literal(Context.senMLImports.toString()),
		id: deviceId,
		imports: Type.Array(SenMLImport, { minItems: 1 }),
	},
	{
		title: 'SenML imports',
		description:
			'Describes the results of processing the SenML sent by devices.',
	},
)

import { Type } from '@sinclair/typebox'
import os from 'node:os'
import { Context } from './Context.js'
import { Model } from './proto.js'

export const ts = Type.Integer({
	description: `Timestamp as Unix epoch with millisecond precision (UTC)`,
	minimum: 1234567890123,
	examples: [1584533788029],
})

const Thingy91WithSolarShieldContext = (transformerId: string) =>
	Type.Literal(
		Context.model(Model.Thingy91WithSolarShield)
			.transformed(transformerId)
			.toString(),
	)

/**
 * The %CONEVAL AT command returns amongst other data the energy estimate: Relative estimated energy consumption of data transmission compared to nominal consumption. A higher value means smaller energy consumption. 5: Difficulties in setting up connections. Maximum number of repetitions might be needed for data.
 */
enum EnergyEstimate {
	/**
	 * Bad conditions. Difficulties in setting up connections. Maximum number of repetitions might be needed for data.
	 */
	Bad = 5,
	/**
	 * Poor conditions. Setting up a connection might require retries and a higher number of repetitions for data.
	 */
	Poor = 6,
	/**
	 * Normal conditions for cIoT device. No repetitions for data or only a few repetitions in the worst case.
	 */
	Normal = 7,
	/**
	 * Good conditions. Possibly very good conditions for small amounts of data.
	 */
	Good = 8,
	/**
	 * Very good conditions. Efficient data transfer estimated also for larger amounts of data.
	 */
	VeryGood = 9,
}

/**
 * @see nrfcloud-application-protocols/schemas/deviceShadow/ipShadow/ipShadow.json
 */
const DeviceInfoShadow = Type.Object(
	{
		appVersion: Type.String(),
		board: Type.String(),
		imei: Type.String(),
		modemFirmware: Type.String(),
		appName: Type.Optional(Type.String()),
		batteryVoltage: Type.Optional(Type.Integer()),
	},
	{
		title: 'DeviceInfo',
		description: `Data describing the device's application, firmware, and hardware versions`,
	},
)

/**
 * @see nrfcloud-application-protocols/schemas/deviceShadow/ipShadow/ipShadow.json
 */
const SimInfo = Type.Object(
	{
		uiccMode: Type.Integer(),
		iccid: Type.String(),
		imsi: Type.String(),
	},
	{
		title: 'SimInfo',
		description: 'Device sim information',
	},
)

/**
 * @see nrfcloud-application-protocols/schemas/deviceShadow/ipShadow/ipShadow.json
 */
const NetworkInfoShadow = Type.Intersect([
	Type.Object(
		{
			areaCode: Type.Integer(),
			cellID: Type.Integer(),
			currentBand: Type.Integer(),
			ipAddress: Type.String(),
			mccmnc: Type.Integer({
				description:
					'Combination of the mobile country code and mobile network codes',
				minimum: 10000,
			}),
			networkMode: Type.String(),
			supportedBands: Type.Optional(Type.String()),
			ueMode: Type.Optional(Type.Integer()),
		},
		{
			title: 'NetworkInfo',
			description: `Device's connected network information`,
		},
	),
	Type.Object({
		eest: Type.Enum(EnergyEstimate),
	}),
])

const Reported = Type.Object({
	'@context': Thingy91WithSolarShieldContext('reported'),
	ts,
	connected: Type.Boolean(),
	version: Type.Integer({
		minimum: 0,
		description: 'The version of the shadow document',
		examples: [8835],
	}),
	config: Type.Optional(
		Type.Object(
			{
				activeMode: Type.Boolean({
					description: 'Whether to enable the active mode.',
					examples: [false],
				}),
				locationTimeout: Type.Integer({
					description:
						'Location search timeout (in seconds): Timeout for location search (GNSS fix, cellular, and WiFi positioning).',
					minimum: 1,
					maximum: 2147483647,
					examples: [60],
				}),
				activeWaitTime: Type.Integer({
					description:
						'In active mode: Wait this amount of seconds until sending the next update. The actual interval will be this time plus the time it takes to get a GNSS fix.',
					minimum: 1,
					maximum: 2147483647,
					examples: [60],
				}),
				movementResolution: Type.Integer({
					description:
						'Movement resolution (in seconds): After detecting movement in passive mode send an update and wait this amount of time until movement again can trigger the next update.',
					minimum: 1,
					maximum: 2147483647,
					examples: [300],
				}),
				movementTimeout: Type.Integer({
					description:
						'Movement timeout (in seconds): Send update at least this often in passive mode.',
					minimum: 1,
					maximum: 2147483647,
					examples: [3600],
				}),
				accThreshAct: Type.Number({
					description:
						'Accelerometer activity threshold (in m/s²): Minimal absolute value for an accelerometer reading to be considered movement.',
					minimum: 0,
					maximum: 78.4532,
					examples: [10.5],
				}),
				accThreshInact: Type.Number({
					description:
						'Accelerometer inactivity threshold (in m/s²): Maximum absolute value for an accelerometer reading to be considered stillness. Must be smaller than the accelerometer activity threshold.',
					minimum: 0,
					maximum: 78.4532,
					examples: [5.2],
				}),
				accTimeoutInact: Type.Number({
					description:
						'Accelerometer inactivity timeout (in s): Hysteresis timeout for stillness detection. Must be smaller than the movement resolution.',
					minimum: 0.08,
					maximum: 5242.88,
					examples: [1.7],
				}),
				nod: Type.Array(Type.String({ minLength: 1 }), {
					description:
						'List of modules which should be disabled when sampling data.',
					type: 'array',
					minItems: 0,
					examples: [['gnss'], ['ncell'], ['gnss', 'ncell']],
				}),
			},
			{
				description: 'Configures the device',
			},
		),
	),
	device: Type.Optional(
		Type.Object({
			deviceInfo: DeviceInfoShadow,
			simInfo: SimInfo,
			networkInfo: NetworkInfoShadow,
		}),
	),
})

const Gain = Type.Object({
	'@context': Thingy91WithSolarShieldContext('gain'),
	ts,
	mA: Type.Number({
		minimum: 0,
		examples: [3.123],
		description: 'Gain from solar shield in mA',
	}),
})

const Voltage = Type.Object({
	'@context': Thingy91WithSolarShieldContext('voltage'),
	ts,
	v: Type.Number({
		minimum: 0,
		examples: [3.1234],
		description: 'Battery voltage as measure by the solar shield',
	}),
})

const NetworkInfo = Type.Intersect([
	Type.Object({
		'@context': Thingy91WithSolarShieldContext('networkInfo'),
		ts,
	}),
	NetworkInfoShadow,
])
const RSRP = Type.Object({
	'@context': Thingy91WithSolarShieldContext('rsrp'),
	ts,
	rsrp: Type.Number({
		minimum: -199,
		maximum: 0,
		title: 'RSRP',
		description:
			'Reference Signal Received Power (RSRP). The average power level in dBm received from a single reference signal in an LTE (Long-term Evolution) network. Typically this value ranges from -140 to -40 dBm. ',
		examples: [-97, -104],
	}),
})

const AirPressure = Type.Object({
	'@context': Thingy91WithSolarShieldContext('airPressure'),
	ts,
	kPa: Type.Number({
		description: 'Atmospheric pressure reading from external sensor in kPa',
		minimum: 0,
		examples: [102.31],
	}),
})

const AirQuality = Type.Object({
	'@context': Thingy91WithSolarShieldContext('airQuality'),
	ts,
	IAQ: Type.Number({
		description: [
			'Index for Air Quality according to BME680 sensor.',
			'0-50 Excellent Pure air; best for well-being',
			'51-100 Good No irritation or impact on well-being',
			'101-150 Lightly polluted Reduction of well-being possible',
			'151-200 Moderately polluted More significant irritation possible',
			'201-250 Heavily polluted Exposition might lead to effects like headache depending on type of VOCs',
			'251-350 Severely polluted More severe health issue possible if harmful VOC present',
			'> 351 Extremely polluted Headaches, additional neurotoxic effects possible',
		].join(os.EOL),
		minimum: 0,
		examples: [177],
	}),
})

const DeviceInfo = Type.Intersect([
	Type.Object({
		'@context': Thingy91WithSolarShieldContext('deviceInfo'),
		ts,
	}),
	DeviceInfoShadow,
])

const AirTemperature = Type.Object({
	'@context': Thingy91WithSolarShieldContext('airTemperature'),
	ts,
	c: Type.Number({
		examples: [25.73],
		description: 'Air temperature in celsius',
	}),
})

const AirHumidity = Type.Object({
	'@context': Thingy91WithSolarShieldContext('airHumidity'),
	ts,
	p: Type.Number({
		minimum: 0,
		maximum: 100,
		examples: [23.16],
		description: 'Humidity in percent',
	}),
})

export const DeviceIdentity = Type.Object({
	'@context': Type.Literal(Context.deviceIdentity.toString()),
	id: Type.String({
		minLength: 1,
		description: 'the device ID',
		examples: ['nrf-352656108602296'],
	}),
	model: Type.String({
		minLength: 1,
		description: 'the device model',
		examples: ['PCA20035', 'PCA20035+solar'],
	}),
})

/**
 * Defines the messages sent by the Muninn backend.
 */
export const MuninnMessage = Type.Union([
	Reported,
	Gain,
	Voltage,
	NetworkInfo,
	RSRP,
	AirPressure,
	AirQuality,
	DeviceInfo,
	AirTemperature,
	AirHumidity,
	DeviceIdentity,
])

import { Type } from '@sinclair/typebox'
import { Battery } from './Battery.js'
import { Gain } from './Gain.js'
import { Location } from './Location.js'
import { ts } from '../../ts.js'
import { Thingy91WithSolarShieldContext } from './context.js'
import { DeviceConfigured } from '../../ConfigureDevice.js'
import { validateWithTypeBox } from '../../../validator/validateWithTypeBox.js'
import { DeviceIdentity } from '../../DeviceIdentity.js'

/**
 * The %CONEVAL AT command returns amongst other data the energy estimate: Relative estimated energy consumption of data transmission compared to nominal consumption. A higher value means smaller energy consumption. 5: Difficulties in setting up connections. Maximum number of repetitions might be needed for data.
 *
 * @see https://infocenter.nordicsemi.com/topic/ref_at_commands/REF/at_commands/mob_termination_ctrl_status/coneval_set.html
 */
export enum EnergyEstimate {
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
	 * Excellent conditions. Efficient data transfer estimated also for larger amounts of data.
	 */
	Excellent = 9,
}

/**
 * @see nrfcloud-application-protocols/schemas/deviceShadow/ipShadow/ipShadow.json
 */
export const DeviceInfoShadow = Type.Object(
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
export const SimInfo = Type.Object(
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
export const NetworkInfoShadow = Type.Intersect([
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
		eest: Type.Optional(Type.Enum(EnergyEstimate)),
	}),
])

export const Reported = Type.Object({
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
			// Initial shadow message has no network info
			networkInfo: Type.Optional(NetworkInfoShadow),
		}),
	),
	lastUpdate: Type.Object(
		{
			device: Type.Object({
				networkInfo: Type.Object({
					networkMode: Type.Optional(ts),
					mccmnc: Type.Optional(ts),
					eest: Type.Optional(ts),
				}),
				deviceInfo: Type.Object({
					appVersion: Type.Optional(ts),
				}),
			}),
		},
		{
			description: 'Contains update timestamps of some properties of interest',
		},
	),
})

export const NetworkInfo = Type.Intersect([
	Type.Object({
		'@context': Thingy91WithSolarShieldContext('networkInfo'),
		ts,
	}),
	NetworkInfoShadow,
])
export const RSRP = Type.Object({
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

export const AirPressure = Type.Object({
	'@context': Thingy91WithSolarShieldContext('airPressure'),
	ts,
	mbar: Type.Number({
		description:
			'Atmospheric pressure reading from external sensor in millibar',
		minimum: 0,
		examples: [1023.1],
	}),
})

export const AirQuality = Type.Object({
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
		].join('\n'),
		minimum: 0,
		examples: [177],
	}),
})

export const DeviceInfo = Type.Intersect([
	Type.Object({
		'@context': Thingy91WithSolarShieldContext('deviceInfo'),
		ts,
	}),
	DeviceInfoShadow,
])

export const AirTemperature = Type.Object({
	'@context': Thingy91WithSolarShieldContext('airTemperature'),
	ts,
	c: Type.Number({
		examples: [25.73],
		description: 'Air temperature in celsius',
	}),
})

export const AirHumidity = Type.Object({
	'@context': Thingy91WithSolarShieldContext('airHumidity'),
	ts,
	p: Type.Number({
		minimum: 0,
		maximum: 100,
		examples: [23.16],
		description: 'Humidity in percent',
	}),
})

export const Button = Type.Object(
	{
		'@context': Thingy91WithSolarShieldContext('button'),
		ts,
		id: Type.Integer({
			minimum: 1,
			examples: [1],
			description: 'The button ID',
		}),
	},
	{
		description: 'A button has been pressed.',
	},
)

/**
 * Defines the messages transformed for the Thingy:91 with solar shield sent by the hello.nrfcloud.com backend.
 */
export const Thingy91WithSolarShieldMessage = Type.Union([
	Reported,
	Gain,
	Battery,
	NetworkInfo,
	RSRP,
	AirPressure,
	AirQuality,
	DeviceInfo,
	AirTemperature,
	AirHumidity,
	Location,
	DeviceIdentity,
	Button,
	DeviceConfigured,
])

export const validator = validateWithTypeBox(Thingy91WithSolarShieldMessage)

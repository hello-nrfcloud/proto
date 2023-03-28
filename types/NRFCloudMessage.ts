import type { AGPS_C2D } from './AGPS_C2D'
import type { AGPS_D2C } from './AGPS_D2C'
import type { AIR_PRESS_D2C } from './AIR_PRESS_D2C'
import type { AIR_QUAL_C2D } from './AIR_QUAL_C2D'
import type { AIR_QUAL_D2C } from './AIR_QUAL_D2C'
import type { BUTTON_D2C } from './BUTTON_D2C'
import type { CELL_POS_C2D } from './CELL_POS_C2D'
import type { CELL_POS_D2C } from './CELL_POS_D2C'
import type { DEVICE_C2D } from './DEVICE_C2D'
import type { DEVICE_D2C } from './DEVICE_D2C'
import type { ENV_C2D } from './ENV_C2D'
import type { FLIP_D2C } from './FLIP_D2C'
import type { GNSS_D2C } from './GNSS_D2C'
import type { GPS_C2D } from './GPS_C2D'
import type { GROUND_FIX_C2D } from './GROUND_FIX_C2D'
import type { GROUND_FIX_D2C } from './GROUND_FIX_D2C'
import type { HUMID_D2C } from './HUMID_D2C'
import type { LED_C2D } from './LED_C2D'
import type { LIGHT_C2D } from './LIGHT_C2D'
import type { LIGHT_D2C } from './LIGHT_D2C'
import type { MODEM_C2D } from './MODEM_C2D'
import type { PGPS_D2C } from './PGPS_D2C'
import type { RSRP_D2C } from './RSRP_D2C'
import type { SCELL_C2D } from './SCELL_C2D'
import type { SCELL_D2C } from './SCELL_D2C'
import type { TEMP_C2D } from './TEMP_C2D'
import type { TEMP_D2C } from './TEMP_D2C'
import type { WIFI_C2D } from './WIFI_C2D'
import type { WIFI_D2C } from './WIFI_D2C'
import type { ipShadow } from './ipShadow'
export type NRFCloudMessage = Readonly<
	| WIFI_C2D
	| TEMP_C2D
	| SCELL_C2D
	| MODEM_C2D
	| LIGHT_C2D
	| LED_C2D
	| GROUND_FIX_C2D
	| GPS_C2D
	| ENV_C2D
	| DEVICE_C2D
	| CELL_POS_C2D
	| AIR_QUAL_C2D
	| AGPS_C2D
	| WIFI_D2C
	| TEMP_D2C
	| SCELL_D2C
	| RSRP_D2C
	| PGPS_D2C
	| LIGHT_D2C
	| HUMID_D2C
	| GROUND_FIX_D2C
	| GNSS_D2C
	| FLIP_D2C
	| DEVICE_D2C
	| CELL_POS_D2C
	| BUTTON_D2C
	| AIR_QUAL_D2C
	| AIR_PRESS_D2C
	| AGPS_D2C
	| ipShadow
>

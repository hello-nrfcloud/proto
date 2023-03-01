import type { AGPS as AGPS_C2D } from './cloudToDevice/AGPS'
import type { AIR_QUAL as AIR_QUAL_C2D } from './cloudToDevice/AIR_QUAL'
import type { CELL_POS as CELL_POS_C2D } from './cloudToDevice/CELL_POS'
import type { DEVICE as DEVICE_C2D } from './cloudToDevice/DEVICE'
import type { ENV as ENV_C2D } from './cloudToDevice/ENV'
import type { GPS as GPS_C2D } from './cloudToDevice/GPS'
import type { GROUND_FIX as GROUND_FIX_C2D } from './cloudToDevice/GROUND_FIX'
import type { LED as LED_C2D } from './cloudToDevice/LED'
import type { LIGHT as LIGHT_C2D } from './cloudToDevice/LIGHT'
import type { MODEM as MODEM_C2D } from './cloudToDevice/MODEM'
import type { PGPS as PGPS_C2D } from './cloudToDevice/PGPS'
import type { SCELL as SCELL_C2D } from './cloudToDevice/SCELL'
import type { TEMP as TEMP_C2D } from './cloudToDevice/TEMP'
import type { WIFI as WIFI_C2D } from './cloudToDevice/WIFI'
import type { AGPS as AGPS_D2C } from './deviceToCloud/AGPS'
import type { AIR_PRESS as AIR_PRESS_D2C } from './deviceToCloud/AIR_PRESS'
import type { AIR_QUAL as AIR_QUAL_D2C } from './deviceToCloud/AIR_QUAL'
import type { BUTTON as BUTTON_D2C } from './deviceToCloud/BUTTON'
import type { CELL_POS as CELL_POS_D2C } from './deviceToCloud/CELL_POS'
import type { DEVICE as DEVICE_D2C } from './deviceToCloud/DEVICE'
import type { FLIP as FLIP_D2C } from './deviceToCloud/FLIP'
import type { GNSS as GNSS_D2C } from './deviceToCloud/GNSS'
import type { GROUND_FIX as GROUND_FIX_D2C } from './deviceToCloud/GROUND_FIX'
import type { HUMID as HUMID_D2C } from './deviceToCloud/HUMID'
import type { LIGHT as LIGHT_D2C } from './deviceToCloud/LIGHT'
import type { PGPS as PGPS_D2C } from './deviceToCloud/PGPS'
import type { RSRP as RSRP_D2C } from './deviceToCloud/RSRP'
import type { SCELL as SCELL_D2C } from './deviceToCloud/SCELL'
import type { TEMP as TEMP_D2C } from './deviceToCloud/TEMP'
import type { WIFI as WIFI_D2C } from './deviceToCloud/WIFI'
export type NRFCloudMessage = Readonly<
	| WIFI_C2D
	| TEMP_C2D
	| SCELL_C2D
	| PGPS_C2D
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
>

import { AGPS as AGPS_C2D } from './cloudToDevice/AGPS'
import { AIR_QUAL as AIR_QUAL_C2D } from './cloudToDevice/AIR_QUAL'
import { CELL_POS as CELL_POS_C2D } from './cloudToDevice/CELL_POS'
import { DEVICE as DEVICE_C2D } from './cloudToDevice/DEVICE'
import { ENV as ENV_C2D } from './cloudToDevice/ENV'
import { GPS as GPS_C2D } from './cloudToDevice/GPS'
import { GROUND_FIX as GROUND_FIX_C2D } from './cloudToDevice/GROUND_FIX'
import { LED as LED_C2D } from './cloudToDevice/LED'
import { LIGHT as LIGHT_C2D } from './cloudToDevice/LIGHT'
import { MODEM as MODEM_C2D } from './cloudToDevice/MODEM'
import { PGPS as PGPS_C2D } from './cloudToDevice/PGPS'
import { SCELL as SCELL_C2D } from './cloudToDevice/SCELL'
import { TEMP as TEMP_C2D } from './cloudToDevice/TEMP'
import { WIFI as WIFI_C2D } from './cloudToDevice/WIFI'
import { AGPS as AGPS_D2C } from './deviceToCloud/AGPS'
import { AIR_PRESS as AIR_PRESS_D2C } from './deviceToCloud/AIR_PRESS'
import { AIR_QUAL as AIR_QUAL_D2C } from './deviceToCloud/AIR_QUAL'
import { BUTTON as BUTTON_D2C } from './deviceToCloud/BUTTON'
import { CELL_POS as CELL_POS_D2C } from './deviceToCloud/CELL_POS'
import { DEVICE as DEVICE_D2C } from './deviceToCloud/DEVICE'
import { FLIP as FLIP_D2C } from './deviceToCloud/FLIP'
import { GNSS as GNSS_D2C } from './deviceToCloud/GNSS'
import { GROUND_FIX as GROUND_FIX_D2C } from './deviceToCloud/GROUND_FIX'
import { HUMID as HUMID_D2C } from './deviceToCloud/HUMID'
import { LIGHT as LIGHT_D2C } from './deviceToCloud/LIGHT'
import { PGPS as PGPS_D2C } from './deviceToCloud/PGPS'
import { RSRP as RSRP_D2C } from './deviceToCloud/RSRP'
import { SCELL as SCELL_D2C } from './deviceToCloud/SCELL'
import { TEMP as TEMP_D2C } from './deviceToCloud/TEMP'
import { WIFI as WIFI_D2C } from './deviceToCloud/WIFI'
export type NRFCloudMessage = Readonly<
	| AGPS_C2D
	| AIR_QUAL_C2D
	| CELL_POS_C2D
	| DEVICE_C2D
	| ENV_C2D
	| GPS_C2D
	| GROUND_FIX_C2D
	| LED_C2D
	| LIGHT_C2D
	| MODEM_C2D
	| PGPS_C2D
	| SCELL_C2D
	| TEMP_C2D
	| WIFI_C2D
	| AGPS_D2C
	| AIR_PRESS_D2C
	| AIR_QUAL_D2C
	| BUTTON_D2C
	| CELL_POS_D2C
	| DEVICE_D2C
	| FLIP_D2C
	| GNSS_D2C
	| GROUND_FIX_D2C
	| HUMID_D2C
	| LIGHT_D2C
	| PGPS_D2C
	| RSRP_D2C
	| SCELL_D2C
	| TEMP_D2C
	| WIFI_D2C
>

import type { WIFI } from './generated/WIFI.js'
import type { TEMP } from './generated/TEMP.js'
import type { SCELL } from './generated/SCELL.js'
import type { RSRP } from './generated/RSRP.js'
import type { PGPS } from './generated/PGPS.js'
import type { LIGHT } from './generated/LIGHT.js'
import type { HUMID } from './generated/HUMID.js'
import type { GROUND_FIX } from './generated/GROUND_FIX.js'
import type { GROUND_FIX_C2D } from './generated/GROUND_FIX_C2D.js'
import type { GNSS } from './generated/GNSS.js'
import type { FLIP } from './generated/FLIP.js'
import type { DEVICE } from './generated/DEVICE.js'
import type { CELL_POS } from './generated/CELL_POS.js'
import type { BUTTON } from './generated/BUTTON.js'
import type { AIR_QUAL } from './generated/AIR_QUAL.js'
import type { AIR_PRESS } from './generated/AIR_PRESS.js'
import type { AGPS } from './generated/AGPS.js'
export type NRFCloudMessage = Readonly<
	| WIFI
	| TEMP
	| SCELL
	| RSRP
	| PGPS
	| LIGHT
	| HUMID
	| GROUND_FIX
	| GROUND_FIX_C2D
	| GNSS
	| FLIP
	| DEVICE
	| CELL_POS
	| BUTTON
	| AIR_QUAL
	| AIR_PRESS
	| AGPS
>

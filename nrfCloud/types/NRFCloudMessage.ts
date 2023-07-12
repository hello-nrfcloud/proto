import type { WIFI } from './generated/WIFI'
import type { TEMP } from './generated/TEMP'
import type { SCELL } from './generated/SCELL'
import type { RSRP } from './generated/RSRP'
import type { PGPS } from './generated/PGPS'
import type { LIGHT } from './generated/LIGHT'
import type { HUMID } from './generated/HUMID'
import type { GROUND_FIX } from './generated/GROUND_FIX'
import type { GROUND_FIX_C2D } from './generated/GROUND_FIX_C2D'
import type { GNSS } from './generated/GNSS'
import type { FLIP } from './generated/FLIP'
import type { DEVICE } from './generated/DEVICE'
import type { CELL_POS } from './generated/CELL_POS'
import type { BUTTON } from './generated/BUTTON'
import type { AIR_QUAL } from './generated/AIR_QUAL'
import type { AIR_PRESS } from './generated/AIR_PRESS'
import type { AGPS } from './generated/AGPS'
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

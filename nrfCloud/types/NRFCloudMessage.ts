import type { AGPS } from './generated/AGPS'
import type { AIR_PRESS } from './generated/AIR_PRESS'
import type { AIR_QUAL } from './generated/AIR_QUAL'
import type { BUTTON } from './generated/BUTTON'
import type { CELL_POS } from './generated/CELL_POS'
import type { DEVICE } from './generated/DEVICE'
import type { FLIP } from './generated/FLIP'
import type { GNSS } from './generated/GNSS'
import type { GROUND_FIX } from './generated/GROUND_FIX'
import type { HUMID } from './generated/HUMID'
import type { LIGHT } from './generated/LIGHT'
import type { PGPS } from './generated/PGPS'
import type { RSRP } from './generated/RSRP'
import type { SCELL } from './generated/SCELL'
import type { TEMP } from './generated/TEMP'
import type { WIFI } from './generated/WIFI'
export type NRFCloudMessage = Readonly<
	| WIFI
	| TEMP
	| SCELL
	| RSRP
	| PGPS
	| LIGHT
	| HUMID
	| GROUND_FIX
	| GNSS
	| FLIP
	| DEVICE
	| CELL_POS
	| BUTTON
	| AIR_QUAL
	| AIR_PRESS
	| AGPS
>

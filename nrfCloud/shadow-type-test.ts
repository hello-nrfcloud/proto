// Make sure the types compile given the example data

import shadowExample from './examples/shadow.json' assert { type: 'json' }
import type { ipShadow } from './types/types'

const shadow: ipShadow = shadowExample.state
void shadow

import { UI } from './ui.component.type'
import { State } from './state.component.type'

export type ComponentUI = {
  name: string
  ui: UI
  state?: State
  props?: string[]
}

export type { UI, State }
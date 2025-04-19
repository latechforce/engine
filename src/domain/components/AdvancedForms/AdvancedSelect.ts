import type { BaseProps } from '../BasicForms/Base'

export type AdvancedSelectProps = BaseProps & {
  placeholder?: string
  options: string[]
}

export type AdvancedSelect = React.ComponentType<AdvancedSelectProps>

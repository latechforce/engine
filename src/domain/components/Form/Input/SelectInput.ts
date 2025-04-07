import type { BaseInputProps } from './BaseInput'

export type SelectInputProps = BaseInputProps & {
  placeholder?: string
  options: string[]
}

export type SelectInput = React.ComponentType<SelectInputProps>

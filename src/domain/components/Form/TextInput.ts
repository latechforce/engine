import type { BaseInputProps } from './BaseInput'

export type TextInputProps = BaseInputProps & {
  placeholder?: string
}

export type TextInput = React.ComponentType<TextInputProps>

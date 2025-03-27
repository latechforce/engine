import type { BaseInputProps } from './BaseInput'

export type SingleLineTextInputProps = BaseInputProps & {
  placeholder?: string
  minLength?: number
  maxLength?: number
}

export type SingleLineTextInput = React.ComponentType<SingleLineTextInputProps>

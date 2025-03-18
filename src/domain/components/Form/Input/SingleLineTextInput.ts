import type { BaseInputProps } from './BaseInput'

export type SingleLineTextInputProps = BaseInputProps & {
  placeholder?: string
}

export type SingleLineTextInput = React.ComponentType<SingleLineTextInputProps>

import type { BaseInputProps } from './BaseInput'

export type LongTextInputProps = BaseInputProps & {
  placeholder?: string
  minLength?: number
  maxLength?: number
}

export type LongTextInput = React.ComponentType<LongTextInputProps>

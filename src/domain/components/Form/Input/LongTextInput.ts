import type { BaseInputProps } from './BaseInput'

export type LongTextInputProps = BaseInputProps & {
  placeholder?: string
}

export type LongTextInput = React.ComponentType<LongTextInputProps>

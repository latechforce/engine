import type { BaseInputProps } from './BaseInput'

export type TextareaInputProps = BaseInputProps & {
  placeholder?: string
  minLength?: number
  maxLength?: number
}

export type TextareaInput = React.ComponentType<TextareaInputProps>

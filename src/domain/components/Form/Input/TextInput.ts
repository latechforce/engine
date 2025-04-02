import type { BaseInputProps } from './BaseInput'

export type TextInputProps = BaseInputProps & {
  type: 'text' | 'email' | 'tel' | 'url' | 'password'
  placeholder?: string
  minLength?: number
  maxLength?: number
}

export type TextInput = React.ComponentType<TextInputProps>

import type { BaseInputProps } from './BaseInput'

export type EmailInputProps = BaseInputProps & {
  placeholder?: string
}

export type EmailInput = React.ComponentType<EmailInputProps>

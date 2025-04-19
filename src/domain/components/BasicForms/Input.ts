import type { BaseProps } from './Base'

export type InputProps = BaseProps & {
  type: 'text' | 'email' | 'tel' | 'url' | 'password'
  placeholder?: string
  minLength?: number
  maxLength?: number
}

export type Input = React.ComponentType<InputProps>

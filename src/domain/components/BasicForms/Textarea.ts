import type { BaseProps } from './Base'

export type TextareaProps = BaseProps & {
  placeholder?: string
  minLength?: number
  maxLength?: number
}

export type Textarea = React.ComponentType<TextareaProps>

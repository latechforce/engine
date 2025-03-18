import type { BaseInputProps } from './BaseInput'

export type SingleSelectInputProps = BaseInputProps & {
  placeholder?: string
  options: string[]
}

export type SingleSelectInput = React.ComponentType<SingleSelectInputProps>

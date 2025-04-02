import type { BaseInputProps } from './BaseInput'

export type FileInputProps = BaseInputProps & {
  placeholder?: string
  multiple?: boolean
}

export type FileInput = React.ComponentType<FileInputProps>

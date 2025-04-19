import type { BaseProps } from './Base'

export type FileInputProps = BaseProps & {
  placeholder?: string
  multiple?: boolean
}

export type FileInput = React.ComponentType<FileInputProps>

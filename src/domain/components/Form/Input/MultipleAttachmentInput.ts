import type { BaseInputProps } from './BaseInput'

export type MultipleAttachmentInputProps = BaseInputProps & {
  placeholder?: string
}

export type MultipleAttachmentInput = React.ComponentType<MultipleAttachmentInputProps>

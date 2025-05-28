import type { Input } from '@/domain/entity/input.entity'

type BaseInputDto = {
  name: string
  label: string
  description?: string
  required?: boolean
}

type TextInputDto = BaseInputDto & {
  type: 'single-line-text' | 'long-text' | 'phone' | 'email' | 'url'
  placeholder?: string
  defaultValue?: string
}

type CheckboxInputDto = BaseInputDto & {
  type: 'checkbox'
  defaultValue?: boolean
}

type SelectInputDto = BaseInputDto & {
  type: 'single-select'
  placeholder?: string
  defaultValue?: string
  options: { label: string; value: string }[]
}

type AttachmentInputDto = BaseInputDto & {
  type: 'single-attachment'
}

export type InputDto = TextInputDto | CheckboxInputDto | SelectInputDto | AttachmentInputDto

export function toInputDto(input: Input): InputDto {
  const props = {
    name: input.schema.name,
    label: input.schema.label ?? input.schema.name,
    description: input.schema.description,
    required: input.schema.required,
  }
  switch (input.schema.type) {
    case 'long-text':
    case 'phone':
    case 'email':
    case 'url':
    case 'single-line-text':
      return {
        ...props,
        type: input.schema.type,
        placeholder: input.schema.placeholder,
        defaultValue: input.schema.defaultValue,
      }
    case 'checkbox':
      return {
        ...props,
        type: input.schema.type,
        defaultValue: input.schema.defaultValue,
      }
    case 'single-select':
      return {
        ...props,
        type: input.schema.type,
        placeholder: input.schema.placeholder,
        defaultValue: input.schema.defaultValue,
        options: input.schema.options,
      }
    case 'single-attachment':
      return {
        ...props,
        type: input.schema.type,
      }
  }
}

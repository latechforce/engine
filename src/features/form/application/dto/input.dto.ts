// Form domain imports
import type { InputSchema } from '../../domain/schema/input'
import type { FieldSchema } from '../../../table/domain/schema/field'

type BaseInputDto = {
  name: string
  label: string
  description?: string
  required?: boolean
}

type TextInputDto = BaseInputDto & {
  type: 'single-line-text' | 'long-text' | 'phone-number' | 'email' | 'url'
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
  accept?: string
}

export type InputDto = TextInputDto | CheckboxInputDto | SelectInputDto | AttachmentInputDto

export function toInputDto(input: InputSchema): InputDto {
  const props = {
    name: input.name,
    label: input.label ?? input.name,
    description: input.description,
    required: input.required,
  }
  switch (input.type) {
    case 'long-text':
    case 'phone-number':
    case 'email':
    case 'url':
    case 'single-line-text':
      return {
        ...props,
        type: input.type,
        placeholder: input.placeholder,
        defaultValue: input.defaultValue,
      }
    case 'checkbox':
      return {
        ...props,
        type: input.type,
        defaultValue: input.defaultValue,
      }
    case 'single-select':
      return {
        ...props,
        type: input.type,
        placeholder: input.placeholder,
        defaultValue: input.defaultValue,
        options: input.options,
      }
    case 'single-attachment':
      return {
        ...props,
        type: input.type,
        accept: input.accept,
      }
    default: {
      const _exhaustiveCheck: never = input
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }
}

export function toInputDtoFromFieldSchema(field: FieldSchema): InputDto {
  const props = {
    name: field.name,
    label: field.name,
    required: field.required ?? false,
  }
  switch (field.type) {
    case 'single-line-text':
    case 'long-text':
    case 'phone-number':
    case 'email':
    case 'url':
      return {
        ...props,
        type: field.type,
        defaultValue: field.default,
      }
    case 'checkbox':
      return {
        ...props,
        type: field.type,
        defaultValue: field.default,
      }
    case 'single-select':
      return {
        ...props,
        type: field.type,
        defaultValue: field.default,
        options: field.options.map((option) => ({
          label: option,
          value: option,
        })),
      }
    case 'single-attachment':
      return {
        ...props,
        type: field.type,
      }
    default: {
      const _exhaustiveCheck: never = field
      throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
    }
  }
}

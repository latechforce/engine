import type { Input } from '@/domain/entity/input.entity'
import type { InputSchema } from '@/domain/validator/input'

export type InputDto = {
  name: string
  label: string
  type: InputSchema['type']
  description?: string
  placeholder?: string
  required?: boolean
  options?: string[]
}

export function toInputDto(input: Input): InputDto {
  return {
    name: input.schema.name,
    label: input.schema.label ?? input.schema.name,
    description: input.schema.description,
    placeholder: input.schema.placeholder,
    required: input.schema.required,
    type: input.schema.type,
    options: input.schema.type === 'single-select' ? input.schema.options : undefined,
  }
}

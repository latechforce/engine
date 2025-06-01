import type { Form } from '@/form/domain/entity/form.entity'
import { toInputDto, type InputDto } from './input.dto'

export type FormDto = {
  name: string
  path: string
  action: string
  inputs: InputDto[]
  title?: string
  description?: string
  successMessage?: string
}

export function toFormDto(form: Form): FormDto {
  return {
    name: form.schema.name,
    title: form.schema.title,
    path: form.path,
    action: form.schema.action,
    description: form.schema.description,
    inputs: form.schema.inputs.map(toInputDto),
    successMessage: form.schema.successMessage,
  }
}

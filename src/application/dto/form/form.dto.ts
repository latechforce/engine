import type { Form } from '@/domain/entity/form.entity'
import { toInputDto, type InputDto } from './input.dto'

export type FormDto = {
  title: string
  path: string
  action: string
  description?: string
  inputs: InputDto[]
}

export function toFormDto(form: Form): FormDto {
  return {
    title: form.schema.title,
    path: form.path,
    action: form.schema.action,
    description: form.schema.description,
    inputs: form.schema.inputs.map(toInputDto),
  }
}

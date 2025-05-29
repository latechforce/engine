import type { Form } from '@/form/domain/entity/form.entity'
import { toFormDto, type FormDto } from './form.dto'

export type GetFormDto = {
  form: FormDto
}

export function toGetFormDto(form: Form): GetFormDto {
  return {
    form: toFormDto(form),
  }
}

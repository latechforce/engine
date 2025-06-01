import type { Form } from '@/form/domain/entity/form.entity'
import { toFormDto, type FormDto } from './form.dto'

export type ListFormsDto = {
  forms: FormDto[]
}

export function toListFormsDto(forms: Form[]): ListFormsDto {
  return {
    forms: forms.map(toFormDto),
  }
}

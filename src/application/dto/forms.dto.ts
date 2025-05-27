import type { Form } from '@/domain/entity/form.entity'

export type FormDto = {
  title: string
  path: string
}

export function toFormDto(form: Form): FormDto {
  return {
    title: form.schema.title,
    path: form.path,
  }
}

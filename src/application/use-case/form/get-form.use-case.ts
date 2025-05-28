import { injectable } from 'inversify'
import type { FormDto } from '@/application/dto/form.dto'
import { toFormDto } from '@/application/dto/form.dto'
import type { Form } from '@/domain/entity/form.entity'

@injectable()
export class GetFormUseCase {
  constructor() {}

  async execute(form: Form): Promise<FormDto> {
    return toFormDto(form)
  }
}

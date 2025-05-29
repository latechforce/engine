import { injectable } from 'inversify'
import type { Form } from '@/form/domain/entity/form.entity'
import { toGetFormDto, type GetFormDto } from '@/form/application/dto/get-form.dto'

@injectable()
export class GetFormUseCase {
  constructor() {}

  async execute(form: Form): Promise<GetFormDto> {
    return toGetFormDto(form)
  }
}

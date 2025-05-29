import { injectable } from 'inversify'
import type { Form } from '@/domain/entity/form.entity'
import { toGetFormDto, type GetFormDto } from '@/application/dto/form/get-form.dto'

@injectable()
export class GetFormUseCase {
  constructor() {}

  async execute(form: Form): Promise<GetFormDto> {
    return toGetFormDto(form)
  }
}

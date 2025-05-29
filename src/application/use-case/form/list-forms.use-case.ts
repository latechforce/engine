import { injectable } from 'inversify'
import type { App } from '@/domain/entity/app.entity'
import { toListFormsDto, type ListFormsDto } from '@/application/dto/form/list-forms.dto'

@injectable()
export class ListFormsUseCase {
  constructor() {}

  async execute(app: App): Promise<ListFormsDto> {
    return toListFormsDto(app.forms)
  }
}

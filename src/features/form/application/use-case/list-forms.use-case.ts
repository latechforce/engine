import { injectable } from 'inversify'
import type { App } from '@/app/domain/entity/app.entity'
import { toListFormsDto, type ListFormsDto } from '@/form/application/dto/list-forms.dto'

@injectable()
export class ListFormsUseCase {
  constructor() {}

  async execute(app: App): Promise<ListFormsDto> {
    return toListFormsDto(app.forms)
  }
}

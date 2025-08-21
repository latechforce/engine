import type { App } from '../../../../features/app/domain/entity/app.entity'
import { toListFormsDto, type ListFormsDto } from '../dto/list-forms.dto'

export class ListFormsUseCase {
  constructor() {}

  async execute(app: App): Promise<ListFormsDto> {
    return toListFormsDto(app.forms)
  }
}

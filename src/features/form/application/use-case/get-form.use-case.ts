import { toGetFormDto, type GetFormDto } from '../dto/get-form.dto'
import type { App } from '../../../../features/app/domain/entity/app.entity'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'

export class GetFormUseCase {
  constructor() {}

  async execute(app: App, pathOrId: string): Promise<GetFormDto> {
    const form = app.findForm(pathOrId)
    if (!form) {
      throw new HttpError('Form not found', 404)
    }
    return toGetFormDto(form)
  }
}

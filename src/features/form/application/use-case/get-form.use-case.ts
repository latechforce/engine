import { injectable } from 'inversify'
import { toGetFormDto, type GetFormDto } from '../dto/get-form.dto'
import type { App } from '../../../../features/app/domain/entity/app.entity'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'

@injectable()
export class GetFormUseCase {
  constructor() {}

  async execute(app: App, path: string): Promise<GetFormDto> {
    const form = app.forms.find((form) => form.path === path)
    if (!form) {
      throw new HttpError('Form not found', 404)
    }
    return toGetFormDto(form)
  }
}

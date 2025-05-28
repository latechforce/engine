import { injectable } from 'inversify'
import type { App } from '@/domain/entity/app.entity'
import type { FormDto } from '@/application/dto/form.dto'
import { toFormDto } from '@/application/dto/form.dto'

@injectable()
export class ListFormsUseCase {
  constructor() {}

  async execute(app: App): Promise<FormDto[]> {
    return app.forms.map(toFormDto)
  }
}

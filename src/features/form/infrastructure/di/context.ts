import type { ListFormsUseCase } from '@/form/application/use-case/list-forms.use-case'
import type { GetFormUseCase } from '@/form/application/use-case/get-form.use-case'
import { inject, injectable } from 'inversify'
import TYPES from '../../application/di/types'
import type { Context } from 'hono'

export type FormHonoContextType = {
  listFormsUseCase: ListFormsUseCase
  getFormUseCase: GetFormUseCase
}

@injectable()
export class FormHonoContext {
  constructor(
    @inject(TYPES.UseCase.List)
    private readonly listFormsUseCase: ListFormsUseCase,
    @inject(TYPES.UseCase.Get)
    private readonly getFormUseCase: GetFormUseCase
  ) {}

  setVariables(c: Context) {
    c.set('listFormsUseCase', this.listFormsUseCase)
    c.set('getFormUseCase', this.getFormUseCase)
  }
}

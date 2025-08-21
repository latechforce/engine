import type { ListFormsUseCase } from '../../application/use-case/list-forms.use-case'
import type { GetFormUseCase } from '../../application/use-case/get-form.use-case'
import type { Context } from 'hono'

export type FormHonoContextType = {
  listFormsUseCase: ListFormsUseCase
  getFormUseCase: GetFormUseCase
}

export class FormHonoContext {
  constructor(
    private readonly listFormsUseCase: ListFormsUseCase,

    private readonly getFormUseCase: GetFormUseCase
  ) {}

  setVariables(c: Context) {
    c.set('listFormsUseCase', this.listFormsUseCase)
    c.set('getFormUseCase', this.getFormUseCase)
  }
}

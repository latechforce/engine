import type { Context } from 'hono'
import type { HonoType } from '../../../../shared/infrastructure/service'

export class FormController {
  static async list(c: Context<HonoType>) {
    const app = c.get('app')
    const listFormsUseCase = c.get('listFormsUseCase')
    const listFormsDto = await listFormsUseCase.execute(app)
    return c.json(listFormsDto)
  }

  static async get(c: Context<HonoType>, data: { path: string }) {
    const app = c.get('app')
    const getFormUseCase = c.get('getFormUseCase')
    const getFormDto = await getFormUseCase.execute(app, data.path)
    return c.json(getFormDto)
  }
}

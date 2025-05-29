import type { Context } from 'hono'
import type { HonoType } from '@/shared/infrastructure/service'

export class FormController {
  static async list(c: Context<HonoType>) {
    const app = c.get('app')
    const listFormsUseCase = c.get('listFormsUseCase')
    const listFormsDto = await listFormsUseCase.execute(app)
    return c.json(listFormsDto)
  }

  static async get(c: Context<HonoType>) {
    const app = c.get('app')
    const path = c.req.param('path')
    const getFormUseCase = c.get('getFormUseCase')
    const form = app.forms.find((form) => form.path === path)
    if (!form) return c.json({ error: 'Form not found' }, 404)
    const getFormDto = await getFormUseCase.execute(form)
    return c.json(getFormDto)
  }
}

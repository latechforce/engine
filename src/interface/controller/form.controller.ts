import type { Context } from 'hono'
import type { HonoType } from '@/infrastructure/di/server.di'

export class FormController {
  static async list(c: Context<HonoType>) {
    const app = c.get('app')
    const listFormsUseCase = c.get('listFormsUseCase')
    const formsDto = await listFormsUseCase.execute(app)
    return c.json({ forms: formsDto })
  }

  static async get(c: Context<HonoType>) {
    const app = c.get('app')
    const path = c.req.param('path')
    const getFormUseCase = c.get('getFormUseCase')
    const form = app.forms.find((form) => form.path === path)
    if (!form) return c.json({ error: 'Form not found' }, 404)
    const formDto = await getFormUseCase.execute(form)
    return c.json({ form: formDto })
  }
}

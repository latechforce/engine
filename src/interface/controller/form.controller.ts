import type { Context } from 'hono'
import type { HonoType } from '@/infrastructure/service/server.service'

export class FormController {
  static async list(c: Context<HonoType>) {
    const app = c.get('app')
    const listFormsUseCase = c.get('listFormsUseCase')
    const forms = await listFormsUseCase.execute(app)
    return c.json(forms)
  }
}

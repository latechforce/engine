import type { Context } from 'hono'
import type { HonoType } from '@/infrastructure/service/server.service'

export class RunController {
  static async list(c: Context<HonoType>) {
    const listRunsUseCase = c.get('listRunsUseCase')
    const runs = await listRunsUseCase.execute()
    return c.json(runs)
  }
}

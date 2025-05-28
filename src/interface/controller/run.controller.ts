import type { Context } from 'hono'
import type { HonoType } from '@/infrastructure/di/server.di'

export class RunController {
  static async list(c: Context<HonoType>) {
    const listRunsUseCase = c.get('listRunsUseCase')
    const runsDto = await listRunsUseCase.execute()
    return c.json({ runs: runsDto })
  }
}

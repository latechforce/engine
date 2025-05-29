import type { Context } from 'hono'
import type { HonoType } from '@/infrastructure/di/server.di'

export class RunController {
  static async list(c: Context<HonoType>) {
    const listRunsUseCase = c.get('listRunsUseCase')
    const listRunsDto = await listRunsUseCase.execute()
    return c.json(listRunsDto)
  }

  static async get(c: Context<HonoType>) {
    const id = c.req.param('id')
    const getRunUseCase = c.get('getRunUseCase')
    const getRunDto = await getRunUseCase.execute(id)
    if (!getRunDto) {
      return c.json({ error: 'Run not found' }, 404)
    }
    return c.json(getRunDto)
  }
}

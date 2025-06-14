import type { Context } from 'hono'
import type { HonoType } from '../../../../shared/infrastructure/service'

export class RunController {
  static async list(c: Context<HonoType>) {
    const listRunsUseCase = c.get('listRunsUseCase')
    const listRunsDto = await listRunsUseCase.execute()
    return c.json(listRunsDto)
  }

  static async get(c: Context<HonoType>, data: { runId: string }) {
    const getRunUseCase = c.get('getRunUseCase')
    const getRunDto = await getRunUseCase.execute(data.runId)
    return c.json(getRunDto)
  }
}

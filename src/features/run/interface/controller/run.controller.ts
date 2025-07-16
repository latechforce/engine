import type { Context } from 'hono'
import type { HonoType } from '../../../../shared/infrastructure/service'
import type { ListRunsParams } from '../../domain/repository-interface/run-repository.interface'

export class RunController {
  static async list(c: Context<HonoType>, params: ListRunsParams) {
    const app = c.get('app')
    const listRunsUseCase = c.get('listRunsUseCase')
    const listRunsDto = await listRunsUseCase.execute(app, params)
    return c.json(listRunsDto)
  }

  static async get(c: Context<HonoType>, data: { runId: string }) {
    const app = c.get('app')
    const getRunUseCase = c.get('getRunUseCase')
    const getRunDto = await getRunUseCase.execute(app, data.runId)
    return c.json(getRunDto)
  }
}

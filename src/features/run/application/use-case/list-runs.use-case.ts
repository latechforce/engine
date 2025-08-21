import type { IRunRepository } from '../../domain/repository-interface/run-repository.interface'
import { toListRunsDto, type ListRunsDto } from '../dto/list-runs.dto'
import type { App } from '../../../../features/app/domain/entity/app.entity'
import type { ListRunsParams } from '../../domain/repository-interface/run-repository.interface'

export class ListRunsUseCase {
  constructor(private readonly runRepository: IRunRepository) {}

  async execute(app: App, params: ListRunsParams): Promise<ListRunsDto> {
    const automationsFiltered = app.automations
      .filter((automation) => automation.schema.name.includes(params.search))
      .map((automation) => automation.schema.id)
    const { runs, totalCount } = await this.runRepository.list(params, automationsFiltered)
    return toListRunsDto(runs, app.automations, {
      pageIndex: params.pageIndex,
      pageSize: params.pageSize,
      pageCount: Math.ceil(totalCount / params.pageSize),
      rowCount: totalCount,
    })
  }
}

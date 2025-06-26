import type { IRunRepository } from '../../domain/repository-interface/run-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import { toListRunsDto, type ListRunsDto } from '../dto/list-runs.dto'
import type { App } from '../../../../features/app/domain/entity/app.entity'

@injectable()
export class ListRunsUseCase {
  constructor(
    @inject(TYPES.Repository)
    private readonly runRepository: IRunRepository
  ) {}

  async execute(app: App, query?: string): Promise<ListRunsDto> {
    const automationsFiltered = app.automations
      .filter((automation) => automation.schema.name.includes(query ?? ''))
      .map((automation) => automation.schema.id)
    const runs = await this.runRepository.list(query, automationsFiltered)
    return toListRunsDto(runs, app.automations)
  }
}

import type { App } from '../../../app/domain/entity/app.entity'
import type { IAutomationRepository } from '../../domain/repository-interface/automation-repository.interface'
import { toGetAutomationDto, type GetAutomationDto } from '../dto/get-automation.dto'
import type {
  IRunRepository,
  ListRunsParams,
} from '../../../run/domain/repository-interface/run-repository.interface'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'

export class GetAutomationUseCase {
  constructor(
    private readonly automationRepository: IAutomationRepository,

    private readonly runRepository: IRunRepository
  ) {}

  async execute(app: App, automationId: string, params: ListRunsParams): Promise<GetAutomationDto> {
    const automation = app.findAutomation(automationId)
    if (!automation) {
      throw new HttpError('Automation not found', 404)
    }
    const status = await this.automationRepository.status.get(automation.schema.id)
    if (!status) {
      throw new HttpError('Automation status not found', 404)
    }
    const { runs, totalCount } = await this.runRepository.listByAutomationId(
      automation.schema.id,
      params
    )
    return toGetAutomationDto(automation, status, runs, {
      pageIndex: params.pageIndex,
      pageSize: params.pageSize,
      pageCount: Math.ceil(totalCount / params.pageSize),
      rowCount: totalCount,
    })
  }
}

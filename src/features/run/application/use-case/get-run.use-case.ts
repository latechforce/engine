import type { IRunRepository } from '../../domain/repository-interface/run-repository.interface'
import { toGetRunDto, type GetRunDto } from '../dto/get-run.dto'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { App } from '../../../../features/app/domain/entity/app.entity'
import type { IAutomationRepository } from '../../../automation/domain/repository-interface/automation-repository.interface'

export class GetRunUseCase {
  constructor(
    private readonly runRepository: IRunRepository,

    private readonly automationRepository: IAutomationRepository
  ) {}

  async execute(app: App, id: string): Promise<GetRunDto> {
    const run = await this.runRepository.get(id)
    if (!run) {
      throw new HttpError('Run not found', 404)
    }
    const automation = app.findAutomation(run.automation_id)
    if (!automation) {
      throw new HttpError('Automation not found', 404)
    }
    const status = await this.automationRepository.status.get(automation.schema.id)
    if (!status) {
      throw new HttpError('Automation status not found', 404)
    }
    return toGetRunDto(run, automation, status)
  }
}

import type { IRunRepository } from '../../domain/repository-interface/run-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import { toGetRunDto, type GetRunDto } from '../dto/get-run.dto'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { App } from '../../../../features/app/domain/entity/app.entity'

@injectable()
export class GetRunUseCase {
  constructor(
    @inject(TYPES.Repository)
    private readonly runRepository: IRunRepository
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
    return toGetRunDto(run, automation)
  }
}

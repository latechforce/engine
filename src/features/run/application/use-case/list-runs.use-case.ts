import type { IRunRepository } from '@/run/domain/repository-interface/run-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '@/shared/infrastructure/di/types'
import { toListRunsDto, type ListRunsDto } from '@/run/application/dto/list-runs.dto'

@injectable()
export class ListRunsUseCase {
  constructor(
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository
  ) {}

  async execute(): Promise<ListRunsDto> {
    const runs = await this.runRepository.list()
    return toListRunsDto(runs)
  }
}

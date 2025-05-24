import { toRunDto, type RunDto } from '@/application/dto/run.dto'
import type { IRunRepository } from '@/domain/repository-interface/run-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '@/infrastructure/di/types'

@injectable()
export class ListRunsUseCase {
  constructor(
    @inject(TYPES.Repository.Run)
    private readonly runRepository: IRunRepository
  ) {}

  async execute(): Promise<RunDto[]> {
    const runs = await this.runRepository.list()
    return runs.map(toRunDto)
  }
}

import type { IRunRepository } from '../../domain/repository-interface/run-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '../di/types'
import { toListRunsDto, type ListRunsDto } from '../dto/list-runs.dto'

@injectable()
export class ListRunsUseCase {
  constructor(
    @inject(TYPES.Repository)
    private readonly runRepository: IRunRepository
  ) {}

  async execute(): Promise<ListRunsDto> {
    const runs = await this.runRepository.list()
    return toListRunsDto(runs)
  }
}

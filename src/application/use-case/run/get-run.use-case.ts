import type { IRunRepository } from '@/domain/repository-interface/run-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '@/infrastructure/di/types'
import { toGetRunDto, type GetRunDto } from '@/application/dto/run/get-run.dto'

@injectable()
export class GetRunUseCase {
  constructor(
    @inject(TYPES.Repository.Run)
    private readonly runRepository: IRunRepository
  ) {}

  async execute(id: string): Promise<GetRunDto | undefined> {
    const run = await this.runRepository.get(id)
    return run ? toGetRunDto(run) : undefined
  }
}

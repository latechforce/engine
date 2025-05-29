import type { IRunRepository } from '@/run/domain/repository-interface/run-repository.interface'
import { inject, injectable } from 'inversify'
import TYPES from '@/shared/infrastructure/di/types'
import { toGetRunDto, type GetRunDto } from '@/run/application/dto/get-run.dto'

@injectable()
export class GetRunUseCase {
  constructor(
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository
  ) {}

  async execute(id: string): Promise<GetRunDto | undefined> {
    const run = await this.runRepository.get(id)
    return run ? toGetRunDto(run) : undefined
  }
}

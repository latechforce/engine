import type { Job } from '@domain/entities/job'
import type { JobDto } from '../dtos/JobDto'
import { Completed } from '@domain/entities/job/Completed'
import { Failed } from '@domain/entities/job/Failed'
import { Created } from '@domain/entities/job/Created'

export class JobMapper {
  static toEntity = (dto: JobDto): Job => {
    switch (dto.state) {
      case 'created':
        return new Created(dto)
      case 'completed':
        return new Completed(dto)
      case 'failed':
        return new Failed(dto)
      default:
        throw new Error(`State ${dto.state} not supported`)
    }
  }

  static toManyEntities = (dtos: JobDto[]): Job[] => {
    return dtos.map(JobMapper.toEntity)
  }
}

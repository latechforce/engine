import { inject } from 'inversify'
import type { IConnectionRepository } from '../../domain/repository-interface/connection-repository.interface'
import TYPES from '../di/types'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { App } from '../../../app/domain/entity/app.entity'
import { toConnectionDto, type ConnectionDto } from '../dto/connection.dto'

export class DisconnectConnectionUseCase {
  constructor(
    @inject(TYPES.Repository.Connection)
    private readonly connectionRepository: IConnectionRepository
  ) {}

  async execute(app: App, id: string): Promise<ConnectionDto> {
    const connection = app.findConnection(id)
    if (!connection) {
      throw new HttpError('Connection not found', 404)
    }
    await this.connectionRepository.status.setConnected(connection.id, false)
    const status = await this.connectionRepository.status.get(connection.id)
    if (!status) {
      throw new HttpError('Status not found', 500)
    }
    return toConnectionDto(connection, status)
  }
}

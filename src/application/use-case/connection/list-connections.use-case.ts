import { inject, injectable } from 'inversify'
import type { App } from '@/domain/entity/app.entity'
import { toConnectionDto, type ConnectionDto } from '@/application/dto/connection.dto'
import TYPES from '@/infrastructure/di/types'
import type { IConnectionRepository } from '@/domain/repository-interface/connection-repository.interface'

@injectable()
export class ListConnectionsUseCase {
  constructor(
    @inject(TYPES.Repository.Connection)
    private readonly connectionRepository: IConnectionRepository
  ) {}

  async execute(app: App): Promise<ConnectionDto[]> {
    const dtos: ConnectionDto[] = []
    const statuses = await this.connectionRepository.status.listByIds(
      app.connections.map((c) => c.schema.id)
    )
    for (const connection of app.connections) {
      const status = statuses.find((s) => s.id === connection.schema.id)
      if (!status) {
        continue
      }
      const authorizationUrl =
        connection.authType === 'oauth'
          ? this.connectionRepository.getAuthorizationUrl(connection)
          : undefined
      dtos.push(toConnectionDto(connection, status, authorizationUrl))
    }
    return dtos
  }
}

import { inject, injectable } from 'inversify'
import type { App } from '@/app/domain/entity/app.entity'
import TYPES from '../di/types'
import type { IConnectionRepository } from '@/connection/domain/repository-interface/connection-repository.interface'
import {
  toListConnectionsDto,
  type ListConnectionsDto,
  type ListConnectionsDtoItem,
} from '@/connection/application/dto/list-connections.dto'

@injectable()
export class ListConnectionsUseCase {
  constructor(
    @inject(TYPES.Repository.Connection)
    private readonly connectionRepository: IConnectionRepository
  ) {}

  async execute(app: App): Promise<ListConnectionsDto> {
    const connections: ListConnectionsDtoItem[] = []
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
      connections.push({ connection, status, authorizationUrl })
    }
    return toListConnectionsDto(connections)
  }
}

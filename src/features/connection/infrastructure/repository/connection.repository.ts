import { inject, injectable } from 'inversify'
import TYPES from '../../../../shared/application/di/types'
import type { IConnectionRepository } from '../../domain/repository-interface/connection-repository.interface'
import type { LoggerService } from '../../../../shared/infrastructure/service/logger.service'
import type { Token } from '../../domain/value-object/token.value-object'
import { toConnectionIntegration } from '../integration'
import { Connection } from '../../domain/entity/connection.entity'
import type { ConnectionStatus } from '../../domain/value-object/connection-status.value-object'
import type { ConnectionDatabaseService } from '../service/database.service'

@injectable()
export class ConnectionRepository implements IConnectionRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Connection.Service.Database)
    private readonly database: ConnectionDatabaseService
  ) {}

  debug(message: string) {
    this.logger.child('connection-repository').debug(message)
  }

  error(message: string) {
    this.logger.error(message)
  }

  getAuthorizationUrl(connection: Connection): string {
    const integration = toConnectionIntegration(connection)
    return integration.getAuthorizationUrl()
  }

  async getAccessTokenFromCode(connection: Connection, code: string): Promise<Token> {
    const integration = toConnectionIntegration(connection)
    return integration.getAccessTokenFromCode(code)
  }

  get status() {
    return {
      create: async (status: ConnectionStatus) => {
        await this.database.connection_status.create({
          id: status.id,
          connected: status.connected,
          created_at: status.createdAt,
          updated_at: status.updatedAt,
        })
      },
      setConnected: async (id: number, connected: boolean) => {
        await this.database.connection_status.update(id, {
          connected,
          updated_at: new Date(),
        })
      },
      get: async (id: number) => {
        const status = await this.database.connection_status.get(id)
        if (!status) {
          return undefined
        }
        return {
          id: status.id,
          connected: status.connected,
          createdAt: status.created_at,
          updatedAt: status.updated_at,
        }
      },
      listByIds: async (ids: number[]) => {
        const statuses = await this.database.connection_status.listByIds(ids)
        return statuses.map((status) => ({
          id: status.id,
          connected: status.connected,
          createdAt: status.created_at,
          updatedAt: status.updated_at,
        }))
      },
    }
  }
}

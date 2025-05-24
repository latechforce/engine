import { inject, injectable } from 'inversify'
import type { DatabaseService } from '../service/database.service'
import TYPES from '../di/types'
import type { IConnectionRepository } from '@/domain/repository-interface/connection-repository.interface'
import type { LoggerService } from '../service/logger.service'
import type { Token } from '@/domain/value-object/token.value-object'
import { mapIntegration } from '../integration/mapper'
import { Connection } from '@/domain/entity/connection.entity'
import type { ConnectionStatus } from '@/domain/value-object/connection-status.value-object'

@injectable()
export class ConnectionRepository implements IConnectionRepository {
  constructor(
    @inject(TYPES.Service.Database)
    private readonly database: DatabaseService,
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService
  ) {}

  debug(message: string) {
    this.logger.child('connection-repository').debug(message)
  }

  error(message: string) {
    this.logger.error(message)
  }

  getAuthorizationUrl(connection: Connection): string {
    const integration = mapIntegration(connection)
    return integration.getAuthorizationUrl()
  }

  async getAccessToken(connection: Connection, code: string): Promise<Token> {
    const integration = mapIntegration(connection)
    return integration.getAccessToken(code)
  }

  async check(connection: Connection): Promise<boolean> {
    const integration = mapIntegration(connection)
    const token = await this.database.table.token.get(connection.schema.id)
    return integration.checkConnection(token)
  }

  get status() {
    return {
      create: async (status: ConnectionStatus) => {
        await this.database.table.connection_status.create(status)
      },
      update: async (id: number, connected: boolean) => {
        await this.database.table.connection_status.update(id, {
          connected,
          updated_at: new Date(),
        })
      },
      get: async (id: number) => {
        return await this.database.table.connection_status.get(id)
      },
      listByIds: async (ids: number[]) => {
        return await this.database.table.connection_status.listByIds(ids)
      },
    }
  }
}

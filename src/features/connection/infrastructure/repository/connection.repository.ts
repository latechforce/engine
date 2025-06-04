import { inject, injectable } from 'inversify'
import TYPES from '../../../../shared/application/di/types'
import type { IConnectionRepository } from '../../domain/repository-interface/connection-repository.interface'
import type { LoggerService } from '../../../../shared/infrastructure/service/logger.service'
import type { Token } from '../../domain/value-object/token.value-object'
import { toConnectionIntegration } from '../integration'
import { Connection } from '../../domain/entity/connection.entity'
import type { ConnectionStatus } from '../../domain/value-object/connection-status.value-object'
import type { ITokenRepository } from '../../domain/repository-interface/token-repository.interface'
import type { ConnectionDatabaseService } from '../service/database.service'

@injectable()
export class ConnectionRepository implements IConnectionRepository {
  constructor(
    @inject(TYPES.Service.Logger)
    private readonly logger: LoggerService,
    @inject(TYPES.Connection.Service.Database)
    private readonly database: ConnectionDatabaseService,
    @inject(TYPES.Connection.Repository.Token)
    private readonly tokenRepository: ITokenRepository
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

  async check(connection: Connection): Promise<boolean> {
    const integration = toConnectionIntegration(connection)
    const token = await this.tokenRepository.getAccessToken(connection)
    return integration.checkConnection(token)
  }

  get status() {
    return {
      create: async (status: ConnectionStatus) => {
        await this.database.connection_status.create(status)
      },
      update: async (id: number, connected: boolean) => {
        await this.database.connection_status.update(id, {
          connected,
          updated_at: new Date(),
        })
      },
      get: async (id: number) => {
        return await this.database.connection_status.get(id)
      },
      listByIds: async (ids: number[]) => {
        return await this.database.connection_status.listByIds(ids)
      },
    }
  }
}

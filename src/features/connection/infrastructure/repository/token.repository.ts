// Third-party imports
import { inject, injectable } from 'inversify'
import { addSeconds, isAfter } from 'date-fns'

// Shared imports
import TYPES from '../../../../shared/application/di/types'

// Connection domain imports
import type { Connection } from '../../domain/entity/connection.entity'
import type { Token } from '../../domain/value-object/token.value-object'
import type { ITokenRepository } from '../../domain/repository-interface/token-repository.interface'

// Connection infrastructure imports
import type { ConnectionDatabaseService } from '../service/database.service'
import { toConnectionIntegration } from '../integration'
import type { IConnectionRepository } from '../../domain/repository-interface/connection-repository.interface'

@injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @inject(TYPES.Connection.Service.Database)
    private readonly database: ConnectionDatabaseService,
    @inject(TYPES.Connection.Repository.Connection)
    private readonly connectionRepository: IConnectionRepository
  ) {}

  async getAccessToken(connection: Connection): Promise<Token | undefined> {
    const token = await this.get(connection.schema.id)
    if (!token) return undefined
    if (!this.isTokenValid(token)) {
      const integration = toConnectionIntegration(connection)
      if (!token.refresh_token || !('getAccessTokenFromRefreshToken' in integration)) {
        await this.connectionRepository.status.setConnected(connection.schema.id, false)
        return undefined
      }
      const newToken = await integration.getAccessTokenFromRefreshToken(token.refresh_token)
      await this.update(newToken)
      return newToken
    }
    return token
  }

  async check(connection: Connection): Promise<boolean> {
    const integration = toConnectionIntegration(connection)
    const token = await this.getAccessToken(connection)
    return integration.checkConnection(token)
  }

  async create(token: Token) {
    await this.database.token.create(token)
  }

  async update(token: Token) {
    const { id, ...rest } = token
    await this.database.token.update(token.id, rest)
  }

  async get(id: number): Promise<Token | undefined> {
    const token = await this.database.token.get(id)
    if (!token) return undefined
    return token
  }

  private isTokenValid(token: Token): boolean {
    if (!token.expires_in) return false
    const expirationDate = addSeconds(token.created_at, token.expires_in)
    return isAfter(expirationDate, new Date())
  }
}

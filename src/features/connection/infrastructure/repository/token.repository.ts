// Third-party imports
import { inject, injectable } from 'inversify'
import { addSeconds, isAfter } from 'date-fns'

// Shared imports
import TYPES from '../../../../shared/application/di/types'

// Connection domain imports
import type { ConnectionSchema } from '../../../../integrations/connection.schema'
import type { Token } from '../../domain/value-object/token.value-object'
import type { ITokenRepository } from '../../domain/repository-interface/token-repository.interface'

// Connection infrastructure imports
import type { ConnectionDatabaseService } from '../service/database.service'
import { toConnectionIntegration } from '../../../../integrations/connection'
import type { IConnectionRepository } from '../../domain/repository-interface/connection-repository.interface'

@injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @inject(TYPES.Connection.Service.Database)
    private readonly database: ConnectionDatabaseService,
    @inject(TYPES.Connection.Repository.Connection)
    private readonly connectionRepository: IConnectionRepository
  ) {}

  async onNewRefreshToken(connection: ConnectionSchema, callback: (token: Token) => Promise<void>) {
    const integration = toConnectionIntegration(connection, this.connectionRepository.redirectUri)
    if (!('onNewRefreshToken' in integration)) {
      return
    }
    integration.onNewRefreshToken(callback)
  }

  async getAccessToken(connection: ConnectionSchema): Promise<Token | undefined> {
    const token = await this.get(connection.id)
    if (!token) return undefined
    if (!this.isTokenValid(token)) {
      const integration = toConnectionIntegration(connection, this.connectionRepository.redirectUri)
      let newToken: Token
      switch (integration.tokenType) {
        case 'refresh-token': {
          if (!token.refresh_token) {
            await this.connectionRepository.status.setConnected(connection.id, false)
            return undefined
          }
          newToken = await integration.getAccessTokenFromRefreshToken(token.refresh_token)
          break
        }
        case 'long-live-token': {
          if (!token.access_token) {
            await this.connectionRepository.status.setConnected(connection.id, false)
            return undefined
          }
          newToken = await integration.getAccessTokenFromCurrentToken(token.access_token)
          break
        }
      }
      await this.update(newToken)
      return newToken
    }
    return token
  }

  async check(connection: ConnectionSchema): Promise<boolean> {
    const integration = toConnectionIntegration(connection, this.connectionRepository.redirectUri)
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

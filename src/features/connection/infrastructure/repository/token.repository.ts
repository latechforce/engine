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
import { toConnectionIntegration } from '../../../../shared/integrations/core/connection'
import type { IConnectionRepository } from '../../domain/repository-interface/connection-repository.interface'

@injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @inject(TYPES.Connection.Service.Database)
    private readonly database: ConnectionDatabaseService,
    @inject(TYPES.Connection.Repository.Connection)
    private readonly connectionRepository: IConnectionRepository
  ) {}

  async onNewRefreshToken(connection: Connection, callback: (token: Token) => Promise<void>) {
    const integration = toConnectionIntegration(connection, this.connectionRepository.redirectUri)
    if (!('onNewRefreshToken' in integration)) {
      return
    }
    integration.onNewRefreshToken(callback)
  }

  async getAccessToken(connection: Connection): Promise<Token | undefined> {
    const token = await this.get(connection.id)
    if (!token) return undefined
    if (!this.isTokenValid(token)) {
      const integration = toConnectionIntegration(connection, this.connectionRepository.redirectUri)
      let newToken: Token | undefined
      switch (integration.tokenType) {
        case 'refresh-token': {
          newToken = token.refresh_token
            ? await integration.getAccessTokenFromRefreshToken(token.refresh_token)
            : undefined
          break
        }
        case 'short-lived-token': {
          newToken = await integration.getAccessTokenFromShortLivedToken(token.access_token)
          break
        }
        default: {
          const _exhaustiveCheck: never = integration
          throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
        }
      }
      if (!newToken) {
        await this.connectionRepository.status.setConnected(connection.id, false)
        return undefined
      }
      await this.update(newToken)
      return newToken
    }
    return token
  }

  async check(connection: Connection): Promise<boolean> {
    const integration = toConnectionIntegration(connection, this.connectionRepository.redirectUri)
    const token = await this.getAccessToken(connection)
    return integration.check(token)
  }

  async getEmail(connection: Connection): Promise<string> {
    const integration = toConnectionIntegration(connection, this.connectionRepository.redirectUri)
    const token = await this.getAccessToken(connection)
    if (!token) throw new Error('Token not found')
    return integration.getEmail(token)
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

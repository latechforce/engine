import { inject, injectable } from 'inversify'
import type { ConnectionDatabaseService } from '../service/database.service'
import type { Token } from '@/connection/domain/value-object/token.value-object'
import TYPES from '@/shared/infrastructure/di/types'
import type { ITokenRepository } from '@/connection/domain/repository-interface/token-repository.interface'
import type { Connection } from '@/connection/domain/entity/connection.entity'
import { addSeconds, isAfter } from 'date-fns'
import { toConnectionIntegration } from '../integration'

@injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @inject(TYPES.Connection.Service.Database)
    private readonly database: ConnectionDatabaseService
  ) {}

  async getAccessToken(connection: Connection): Promise<Token | undefined> {
    const token = await this.get(connection.schema.id)
    if (!token) return undefined
    if (!this.isTokenValid(token)) {
      const integration = toConnectionIntegration(connection)
      if (!token.refresh_token) return undefined
      const newToken = await integration.getAccessTokenFromRefreshToken(token.refresh_token)
      await this.update(newToken)
      return newToken
    }
    return token
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

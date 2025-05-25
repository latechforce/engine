import { inject, injectable } from 'inversify'
import type { DatabaseService } from '../service/database.service'
import TYPES from '../di/types'
import type { Token } from '@/domain/value-object/token.value-object'
import type { ITokenRepository } from '@/domain/repository-interface/token-repository.interface'
import type { Connection } from '@/domain/entity/connection.entity'
import { addSeconds, isAfter } from 'date-fns'
import { mapIntegration } from '../integration/mapper'

@injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @inject(TYPES.Service.Database)
    private readonly database: DatabaseService
  ) {}

  async getAccessToken(connection: Connection): Promise<Token | undefined> {
    const token = await this.get(connection.schema.id)
    if (!token) return undefined
    if (!this.isTokenValid(token)) {
      const integration = mapIntegration(connection)
      if (!token.refresh_token) return undefined
      const newToken = await integration.getAccessTokenFromRefreshToken(token.refresh_token)
      await this.update(newToken)
      return newToken
    }
    return token
  }

  async create(token: Token) {
    await this.database.table.token.create(token)
  }

  async update(token: Token) {
    const { id, ...rest } = token
    await this.database.table.token.update(token.id, rest)
  }

  async get(id: number): Promise<Token | undefined> {
    const token = await this.database.table.token.get(id)
    if (!token) return undefined
    return token
  }

  private isTokenValid(token: Token): boolean {
    if (!token.expires_in) return false
    const expirationDate = addSeconds(token.created_at, token.expires_in)
    return isAfter(expirationDate, new Date())
  }
}

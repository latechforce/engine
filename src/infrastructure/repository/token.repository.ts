import { inject, injectable } from 'inversify'
import type { DatabaseService } from '../service/database.service'
import TYPES from '../di/types'
import type { Token } from '@/domain/value-object/token.value-object'
import type { ITokenRepository } from '@/domain/repository-interface/token-repository.interface'

@injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @inject(TYPES.Service.Database)
    private readonly database: DatabaseService
  ) {}

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
}

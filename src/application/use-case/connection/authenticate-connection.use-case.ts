import type { Connection } from '@/domain/entity/connection.entity'
import type { IConnectionRepository } from '@/domain/repository-interface/connection-repository.interface'
import type { ITokenRepository } from '@/domain/repository-interface/token-repository.interface'
import TYPES from '@/infrastructure/di/types'
import { inject, injectable } from 'inversify'

@injectable()
export class AuthenticateConnectionUseCase {
  constructor(
    @inject(TYPES.Repository.Connection)
    private readonly connectionRepository: IConnectionRepository,
    @inject(TYPES.Repository.Token)
    private readonly tokenRepository: ITokenRepository
  ) {}

  async execute(connection: Connection, code: string) {
    try {
      this.connectionRepository.debug(`authenticate "${connection.schema.name}"`)
      const token = await this.connectionRepository.getAccessToken(connection, code)
      const existingToken = await this.tokenRepository.get(token.id)
      if (existingToken) {
        await this.tokenRepository.update(token)
      } else {
        await this.tokenRepository.create(token)
      }
      await this.connectionRepository.status.update(connection.schema.id, true)
    } catch (error) {
      this.connectionRepository.error(
        `authenticate "${connection.schema.name}": ${error instanceof Error ? error.message : 'Unknown error'}`
      )
      throw error
    }
  }
}

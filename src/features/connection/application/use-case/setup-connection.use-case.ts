import TYPES from '../di/types'
import { injectable, inject } from 'inversify'
import type { Connection } from '../../domain/entity/connection.entity'
import type { IConnectionRepository } from '../../domain/repository-interface/connection-repository.interface'
import type { ITokenRepository } from '../../domain/repository-interface/token-repository.interface'

@injectable()
export class SetupConnectionUseCase {
  constructor(
    @inject(TYPES.Repository.Connection)
    private readonly connectionRepository: IConnectionRepository,
    @inject(TYPES.Repository.Token)
    private readonly tokenRepository: ITokenRepository
  ) {}

  async execute(connection: Connection) {
    this.connectionRepository.debug(`setup "${connection.name}"`)
    let status = await this.connectionRepository.status.get(connection.id)
    if (!status) {
      status = {
        id: connection.id,
        connected: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      await this.connectionRepository.status.create(status)
    }
    this.tokenRepository.onNewRefreshToken(connection, async (token) => {
      this.connectionRepository.debug(`new token for "${connection.name}"`)
      await this.tokenRepository.update(token)
    })
    const connected = await this.tokenRepository.check(connection)
    if (connected !== status.connected) {
      await this.connectionRepository.status.setConnected(status.id, connected)
    }
    this.connectionRepository.debug(
      `"${connection.name}" is ${connected ? 'connected' : 'disconnected'}`
    )
  }
}

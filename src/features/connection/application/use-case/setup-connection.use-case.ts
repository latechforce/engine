import type { Connection } from '../../domain/entity/connection.entity'
import type { IConnectionRepository } from '../../domain/repository-interface/connection-repository.interface'
import type { ITokenRepository } from '../../domain/repository-interface/token-repository.interface'

export class SetupConnectionUseCase {
  constructor(
    private readonly connectionRepository: IConnectionRepository,

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
      let emailUsed = status.email_used
      if (connected) {
        emailUsed = await this.tokenRepository.getEmail(connection)
      }
      await this.connectionRepository.status.setConnected(status.id, connected, emailUsed)
      if (!connected) {
        await this.connectionRepository.sendDisconnectedEmail(connection)
      }
    }
    this.connectionRepository.debug(
      `"${connection.name}" is ${connected ? 'connected' : 'disconnected'}`
    )
  }
}

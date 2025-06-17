import type { IConnectionRepository } from '../../domain/repository-interface/connection-repository.interface'
import type { ITokenRepository } from '../../domain/repository-interface/token-repository.interface'
import TYPES from '../di/types'
import { inject, injectable } from 'inversify'
import { HttpError } from '../../../../shared/domain/entity/http-error.entity'
import type { App } from '../../../app/domain/entity/app.entity'

@injectable()
export class AuthenticateConnectionUseCase {
  constructor(
    @inject(TYPES.Repository.Connection)
    private readonly connectionRepository: IConnectionRepository,
    @inject(TYPES.Repository.Token)
    private readonly tokenRepository: ITokenRepository
  ) {}

  async execute(app: App, code?: string, state?: string) {
    const { id } = JSON.parse(state || '{}')
    if (!id || !code) {
      throw new HttpError('Missing id or code', 400)
    }
    const connection = app.connections.find((connection) => connection.id === Number(id))
    if (!connection) {
      throw new HttpError('Connection not found', 404)
    }
    this.connectionRepository.debug(`authenticate "${connection.name}"`)
    const token = await this.connectionRepository.getAccessTokenFromCode(connection, code)
    const existingToken = await this.tokenRepository.get(token.id)
    if (existingToken) {
      await this.tokenRepository.update(token)
    } else {
      await this.tokenRepository.create(token)
    }
    const isValid = await this.tokenRepository.check(connection)
    await this.connectionRepository.status.setConnected(connection.id, isValid)
    if (!isValid) {
      throw new HttpError('Invalid token', 401)
    }
    return `
      <html>
        <body>
          <script>
            // Notify opener window and close this one
            if (window.opener) {
              window.opener.postMessage('oauth:success', '*')
              window.close()
            } else {
              document.body.innerText = 'You can close this window.'
            }
          </script>
        </body>
      </html>
    `
  }
}

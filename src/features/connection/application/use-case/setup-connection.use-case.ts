import TYPES from '@/shared/infrastructure/di/types'
import { injectable, inject } from 'inversify'
import type { Connection } from '@/connection/domain/entity/connection.entity'
import type { IConnectionRepository } from '@/connection/domain/repository-interface/connection-repository.interface'

@injectable()
export class SetupConnectionUseCase {
  constructor(
    @inject(TYPES.Connection.Repository.Connection)
    private readonly connectionRepository: IConnectionRepository
  ) {}

  async execute(connection: Connection) {
    this.connectionRepository.debug(`setup "${connection.schema.name}"`)
    let status = await this.connectionRepository.status.get(connection.schema.id)
    if (!status) {
      status = {
        id: connection.schema.id,
        connected: false,
        created_at: new Date(),
        updated_at: new Date(),
      }
      await this.connectionRepository.status.create(status)
    }
    const connected = await this.connectionRepository.check(connection)
    await this.connectionRepository.status.update(status.id, connected)
  }
}

import type { BunEnvServices } from '../services/bun-env.service'
import type { HonoServerService } from '../services/hono-server.service'
import type { IAppRepository } from '/domain/repositories/app-repository.interface'

export class AppRepository implements IAppRepository {
  constructor(
    private env: BunEnvServices,
    private server: HonoServerService
  ) {}

  async loadEnv() {
    return this.env.load()
  }

  async start() {
    this.server.start()
  }
}

import { Ignitor } from '@adonisjs/core'
import { Env } from '@adonisjs/core/env'
import type { IAppRepository } from '/domain/repositories/IAppRepository'

const APP_ROOT = new URL('../../../', import.meta.url)

export class AdonisAppRepository implements IAppRepository {
  private ignitor: Ignitor

  constructor() {
    this.ignitor = new Ignitor(APP_ROOT)
  }

  async env() {
    const env = await Env.create(APP_ROOT, {
      NODE_ENV: Env.schema.enum.optional(['development', 'production', 'test'] as const),
      PORT: Env.schema.number.optional(),
    })
    return {
      NODE_ENV: env.get('NODE_ENV', 'development'),
      PORT: env.get('PORT', 3000),
    }
  }

  async start() {
    await this.ignitor.httpServer().start()
  }
}

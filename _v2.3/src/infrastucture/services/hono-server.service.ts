import { Hono } from 'hono'
import { serve } from 'bun'
import type { BunEnvServices } from './bun-env.service'

export class HonoServerService {
  private app: Hono

  constructor(private env: BunEnvServices) {
    this.app = new Hono()
    this.app.get('/health', (c) => c.text('OK'))
  }

  start() {
    serve({
      fetch: this.app.fetch,
      port: Number(this.env.get('PORT')),
    })
  }
}

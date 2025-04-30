import { z } from 'zod'
import type { Env } from '/domain/value-objects/env.value-object'
import net from 'net'

export class BunEnvServices {
  private env: Env | null = null
  private partialEnv: Partial<Env>

  constructor() {
    const env = Bun.env
    const envSchema = z.object({
      NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
      PORT: z.string().optional(),
      DATABASE_CLIENT: z.enum(['sqlite', 'postgres']).optional(),
      DATABASE_URL: z.string().optional(),
    })
    this.partialEnv = envSchema.parse(env)
  }

  async load(): Promise<Env> {
    this.env = {
      NODE_ENV: this.partialEnv.NODE_ENV ?? 'development',
      PORT: this.partialEnv.PORT ?? String(await this.getAvailablePort()),
      DATABASE_CLIENT: this.partialEnv.DATABASE_CLIENT ?? 'sqlite',
      DATABASE_URL: this.partialEnv.DATABASE_URL ?? './database.sqlite',
    }
    return this.env
  }

  get(key: keyof Env) {
    if (!this.env) {
      throw new Error('Env not loaded')
    }
    return this.env[key]
  }

  private getAvailablePort(): Promise<number> {
    return new Promise((resolve, reject) => {
      const server = net.createServer()
      server.listen(0, () => {
        const address = server.address()
        if (typeof address === 'object' && address !== null) {
          const port = address.port
          server.close(() => resolve(port))
        } else {
          reject(new Error('Could not determine port'))
        }
      })
      server.on('error', reject)
    })
  }
}

export default new BunEnvServices()

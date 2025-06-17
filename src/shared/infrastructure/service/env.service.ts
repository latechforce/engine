// Third-party imports
import net from 'net'
import { injectable } from 'inversify'

// Shared domain imports
import type { Env } from '../../domain/value-object/env.value-object'
import { envSchema, type EnvSchemaValidated } from '../../domain/schema/env.schema'

@injectable()
export class EnvService {
  private env: Env | null = null
  private parsedEnv: EnvSchemaValidated

  constructor() {
    this.parsedEnv = envSchema.parse(Bun.env)
  }

  async load(): Promise<Env> {
    if (this.env) return this.env
    const port = this.parsedEnv.PORT === '*' ? await this.findAvailablePort() : this.parsedEnv.PORT
    this.env = {
      ...this.parsedEnv,
      PORT: port,
      BASE_URL: this.parsedEnv.BASE_URL?.replace(/\/$/, '') ?? `http://localhost:${port}`,
    }
    return this.env
  }

  get<K extends keyof Env>(key: K): Env[K] {
    if (!this.env) {
      throw new Error(`Environment variables not loaded. Call load() first.`)
    }
    return this.env[key]
  }

  getAny(key: string): string | undefined {
    const all: Record<string, string> = {
      ...Bun.env,
      ...this.env,
    }
    return all[key]
  }

  private async findAvailablePort(): Promise<string> {
    return new Promise((resolve, reject) => {
      const server = net.createServer()
      server.on('error', (error) => {
        reject(new Error(`Failed to find available port: ${error.message}`))
      })
      server.listen(0, () => {
        const address = server.address()
        if (!address || typeof address === 'string') {
          server.close(() => reject(new Error('Invalid server address')))
          return
        }

        const port = address.port
        server.close(() => resolve(String(port)))
      })
    })
  }
}

import type { AppSchema } from '/domain/schemas/AppSchema'
import type { Env } from '/domain/value-objects/Env'

export class App {
  constructor(
    public schema: AppSchema,
    public env: Env
  ) {}

  get url() {
    return `http://localhost:${this.env.PORT}`
  }
}

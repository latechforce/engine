import type { AppSchema } from '../schemas/app.schema'
import type { Env } from '../value-objects/env.value-object'
import { Table } from './table.entity'

export class App {
  constructor(
    public schema: AppSchema,
    public env: Env
  ) {}

  get url() {
    return `http://localhost:${this.env.PORT}`
  }

  get tables(): Table[] {
    return this.schema.tables?.map((table) => new Table(table)) ?? []
  }
}

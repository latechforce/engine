import type { AppSchemaValidated } from '@/types'
import type { Env } from '../value-object/env.value-object'
import { Automation } from './automation.entity'
import { Table } from './table.entity'

export class App {
  public readonly automations: Automation[]
  public readonly tables: Table[]

  constructor(
    public readonly schema: AppSchemaValidated,
    public readonly env: Env
  ) {
    this.automations = this.schema.automations.map((automation) => new Automation(automation))
    this.tables = this.schema.tables.map((table) => new Table(table))
  }

  url(path = ''): string {
    return `${this.env.BASE_URL}${path}`
  }
}

import type { AppSchemaValidated } from '@/domain/validator/app.validator'
import type { Env } from '../value-object/env.value-object'
import { Automation } from './automation.entity'
import { Table } from './table.entity'
import { Connection } from './connection.entity'

export class App {
  public readonly automations: Automation[]
  public readonly tables: Table[]
  public readonly connections: Connection[]

  constructor(
    public readonly schema: AppSchemaValidated,
    public readonly env: Env
  ) {
    this.connections = this.schema.connections.map(
      (connection) => new Connection(connection, this.env.BASE_URL)
    )
    this.automations = this.schema.automations.map(
      (automation) => new Automation(automation, this.connections)
    )
    this.tables = this.schema.tables.map((table) => new Table(table))
  }

  url(path = ''): string {
    return `${this.env.BASE_URL}${path}`
  }
}

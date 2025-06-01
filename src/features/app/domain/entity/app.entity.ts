import type { AppSchemaValidated } from '../schema/app.schema'
import type { Env } from '@/shared/domain/value-object/env.value-object'
import { Automation } from '@/automation/domain/entity/automation.entity'
import { Table } from '@/table/domain/entity/table.entity'
import { Connection } from '@/connection/domain/entity/connection.entity'
import { Form } from '@/form/domain/entity/form.entity'

export class App {
  public readonly automations: Automation[]
  public readonly tables: Table[]
  public readonly connections: Connection[]
  public readonly forms: Form[]

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
    this.forms = this.schema.forms.map((form) => new Form(form))
  }

  url(path = ''): string {
    return `${this.env.BASE_URL}${path}`
  }

  findTable(nameOrId: string | number): Table | undefined {
    return this.tables.find(
      (table) =>
        table.schema.id === Number(nameOrId) ||
        table.schema.name === String(nameOrId) ||
        table.slug === String(nameOrId)
    )
  }

  findForm(name: string): Form | undefined {
    return this.forms.find((form) => form.schema.name === name)
  }
}

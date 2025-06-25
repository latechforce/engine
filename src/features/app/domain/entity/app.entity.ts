import type { AppSchemaValidated } from '../schema/app.schema'
import type { Env } from '../../../../shared/domain/value-object/env.value-object'
import { Automation } from '../../../automation/domain/entity/automation.entity'
import { Table } from '../../../table/domain/entity/table.entity'
import type { ConnectionSchema } from '../../../../integrations/connection.schema'
import { Form } from '../../../form/domain/entity/form.entity'
import { Bucket } from '../../../bucket/domain/entity/bucket.entity'

export class App {
  public readonly automations: Automation[]
  public readonly tables: Table[]
  public readonly connections: ConnectionSchema[]
  public readonly forms: Form[]
  public readonly buckets: Bucket[]

  constructor(
    public readonly schema: AppSchemaValidated,
    public readonly env: Env
  ) {
    schema.buckets = [
      {
        id: 0,
        name: 'tables',
      },
      ...schema.buckets,
    ]
    const automationNames = new Set<string>()
    for (const automation of this.schema.automations) {
      if (automationNames.has(automation.name)) {
        throw new Error(`Duplicate automation name: ${automation.name}`)
      }
      automationNames.add(automation.name)
    }
    const connectionNames = new Set<string>()
    for (const connection of this.schema.connections) {
      if (connectionNames.has(connection.name)) {
        throw new Error(`Duplicate connection name: ${connection.name}`)
      }
      connectionNames.add(connection.name)
    }
    const connectionIds = new Set<number>()
    for (const connection of this.schema.connections) {
      if (connectionIds.has(connection.id)) {
        throw new Error(`Duplicate connection id: ${connection.id}`)
      }
      connectionIds.add(connection.id)
    }
    const tableNames = new Set<string>()
    for (const table of this.schema.tables) {
      if (tableNames.has(table.name)) {
        throw new Error(`Duplicate table name: ${table.name}`)
      }
      tableNames.add(table.name)
    }
    const automationIds = new Set<number>()
    for (const automation of this.schema.automations) {
      if (automationIds.has(automation.id)) {
        throw new Error(`Duplicate automation id: ${automation.id}`)
      }
      automationIds.add(automation.id)
    }
    const automationPaths = new Set<string>()
    for (const automation of this.schema.automations) {
      if (automation.trigger.service === 'http') {
        if (automation.trigger.event === 'post') {
          if (automationPaths.has(automation.trigger.params.path)) {
            throw new Error(`Duplicate trigger path: ${automation.trigger.params.path}`)
          }
          automationPaths.add(automation.trigger.params.path)
        } else if (automation.trigger.event === 'get') {
          if (automationPaths.has(automation.trigger.params.path)) {
            throw new Error(`Duplicate trigger path: ${automation.trigger.params.path}`)
          }
          automationPaths.add(automation.trigger.params.path)
        }
      }
    }
    const tableIds = new Set<number>()
    for (const table of this.schema.tables) {
      if (tableIds.has(table.id)) {
        throw new Error(`Duplicate table id: ${table.id}`)
      }
      tableIds.add(table.id)
    }
    const formNames = new Set<string>()
    for (const form of this.schema.forms) {
      if (formNames.has(form.name)) {
        throw new Error(`Duplicate form name: ${form.name}`)
      }
      formNames.add(form.name)
    }
    const formIds = new Set<number>()
    for (const form of this.schema.forms) {
      if (formIds.has(form.id)) {
        throw new Error(`Duplicate form id: ${form.id}`)
      }
      formIds.add(form.id)
    }
    const formPaths = new Set<string>()
    for (const form of this.schema.forms) {
      if (formPaths.has(form.path)) {
        throw new Error(`Duplicate form path: ${form.path}`)
      }
      formPaths.add(form.path)
    }
    const bucketNames = new Set<string>()
    for (const bucket of this.schema.buckets) {
      if (bucketNames.has(bucket.name)) {
        throw new Error(`Duplicate bucket name: ${bucket.name}`)
      }
      bucketNames.add(bucket.name)
    }
    const bucketIds = new Set<number>()
    for (const bucket of this.schema.buckets) {
      if (bucketIds.has(bucket.id)) {
        throw new Error(`Duplicate bucket id: ${bucket.id}`)
      }
      bucketIds.add(bucket.id)
    }
    this.connections = this.schema.connections
    this.automations = this.schema.automations.map(
      (automation) => new Automation(automation, this.connections)
    )
    this.tables = this.schema.tables.map((table) => new Table(table))
    this.forms = this.schema.forms.map((form) => new Form(form))
    this.buckets = this.schema.buckets.map((bucket) => new Bucket(bucket))
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

  findForm(nameOrPathOrId: string | number): Form | undefined {
    return this.forms.find(
      (form) =>
        form.schema.name === String(nameOrPathOrId) ||
        form.schema.path.replace(/^\//, '') === String(nameOrPathOrId) ||
        form.schema.id === Number(nameOrPathOrId)
    )
  }

  findBucket(nameOrId: string | number): Bucket | undefined {
    return this.buckets.find(
      (bucket) => bucket.schema.id === Number(nameOrId) || bucket.schema.name === String(nameOrId)
    )
  }

  findAutomation(nameOrId: string | number): Automation | undefined {
    return this.automations.find(
      (automation) =>
        automation.schema.id === Number(nameOrId) || automation.schema.name === String(nameOrId)
    )
  }

  findConnection(nameOrId: string | number): ConnectionSchema | undefined {
    return this.connections.find(
      (connection) => connection.id === Number(nameOrId) || connection.name === String(nameOrId)
    )
  }
}

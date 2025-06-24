import type { App } from '../../../app/domain/entity/app.entity'
import type { IntegrationActionSchema } from '../../../../integrations/action.schema'
import type { ActionResult } from '../value-object/action-result.value-object'
import type { IntegrationError } from '../value-object/integration-error.value-object'
import type { ConnectionSchema } from '../../../../integrations/connection.schema'
import type { Table } from '../../../table/domain/entity/table.entity'
import type { FieldValue } from '../../../table/domain/object-value/field-value.object-value'
import type { Record } from '../../../table/domain/entity/record.entity'

export type IActionRepository = {
  log: {
    debug: (message: string) => void
    error: (message: string) => void
  }
  validateSchemaTemplate: (schema: { [key: string]: unknown }) => void
  fillSchema: <T extends { [key: string]: unknown }>(
    schema: T,
    data?: { [key: string]: unknown }
  ) => T
  code: (
    app: App,
    inputData?: { [key: string]: string }
  ) => {
    lint: (code: string) => Promise<string | undefined>
    runJavascript: (code: string) => Promise<{ [key: string]: unknown }>
    runTypescript: (code: string) => Promise<{ [key: string]: unknown }>
  }
  http: (
    url: string,
    options?: RequestInit
  ) => {
    get: () => Promise<{ [key: string]: unknown }>
    post: (body?: { [key: string]: unknown }) => Promise<{ [key: string]: unknown }>
  }
  database: (table: Table) => {
    create: (fields: { [key: string]: FieldValue }) => Promise<Record>
  }
  runIntegration: (
    schema: IntegrationActionSchema,
    connection: ConnectionSchema
  ) => Promise<ActionResult<IntegrationError>>
}

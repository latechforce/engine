import type { App } from '../../../app/domain/entity/app.entity'
import type { IntegrationActionSchema } from '../../../../integrations/action.schema'
import type { ActionResult } from '../value-object/action-result.value-object'
import type { IntegrationError } from '../value-object/integration-error.value.object'
import type { ConnectionSchema } from '../../../../integrations/connection.schema'

export type IActionRepository = {
  debug(message: string): void
  error: (message: string) => void
  fillSchema: <T extends { [key: string]: unknown }>(
    schema: T,
    data?: { [key: string]: unknown }
  ) => T
  code: (
    app: App,
    inputData?: Record<string, string>
  ) => {
    lint: (code: string) => Promise<string | undefined>
    runJavascript: (code: string) => Promise<Record<string, unknown>>
    runTypescript: (code: string) => Promise<Record<string, unknown>>
  }
  http: (
    url: string,
    options?: RequestInit
  ) => {
    get: () => Promise<Record<string, unknown>>
    post: (body?: Record<string, unknown>) => Promise<Record<string, unknown>>
  }
  runIntegration: (
    schema: IntegrationActionSchema,
    connection: ConnectionSchema
  ) => Promise<ActionResult<IntegrationError>>
}

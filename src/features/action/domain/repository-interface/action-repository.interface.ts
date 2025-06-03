import type { App } from '@/app/domain/entity/app.entity'
import type { IntegrationAction } from '../entity/integration-action.entity'
import type { ActionResult } from '../value-object/action-result.value-object'
import type { IntegrationError } from '../value-object/integration-error.value.object'

export type IActionRepository = {
  debug(message: string): void
  error: (message: string) => void
  fillInputData: <T extends { [key: string]: object | string }>(
    inputData: T,
    data: { [key: string]: object }
  ) => T
  code: (
    app: App,
    inputData?: Record<string, string>
  ) => {
    lint: (code: string) => Promise<string | undefined>
    fillInputData: (data: Record<string, unknown>) => Record<string, string>
    runJavascript: (code: string) => Promise<object>
    runTypescript: (code: string) => Promise<object>
  }
  http: (
    url: string,
    options?: RequestInit
  ) => {
    get: () => Promise<object>
    post: (body?: Record<string, unknown>) => Promise<object>
  }
  runIntegration: (action: IntegrationAction) => Promise<ActionResult<IntegrationError>>
}

import type { Env } from '../value-object/env.value-object'
import type { App } from '../entity/app.entity'
import type { ValidateResult } from '../value-object/validate-result.value-object'

export type IAppRepository = {
  loadEnv: () => Promise<Env>
  start: () => Promise<void>
  info: (message: string) => void
  error: (message: string) => void
  setup: (app: App) => Promise<void>
  validate: (unknownSchema: unknown) => ValidateResult
}

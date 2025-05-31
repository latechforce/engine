import type { App } from '../entity/app.entity'
import type { ValidateResult } from '../value-object/validate-result.value-object'
import type { Env } from '@/shared/domain/value-object/env.value-object'

export type IAppRepository = {
  loadEnv: () => Promise<Env>
  start: () => Promise<void>
  stop: () => Promise<void>
  info: (message: string) => void
  error: (message: string) => void
  setup: (app: App) => Promise<void>
  validate: (unknownSchema: unknown) => ValidateResult
}

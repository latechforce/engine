import type { Env } from '../value-objects/env.value-object'

export type IAppRepository = {
  loadEnv: () => Promise<Env>
  start: () => void
}

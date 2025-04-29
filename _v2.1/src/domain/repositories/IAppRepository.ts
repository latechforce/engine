import type { Env } from '/domain/value-objects/Env'

export type IAppRepository = {
  env(): Promise<Env>
  start(): Promise<void>
}

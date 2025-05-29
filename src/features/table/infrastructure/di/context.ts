import { injectable } from 'inversify'
import type { Context } from 'hono'

export type TableHonoContextType = {}

@injectable()
export class TableHonoContext {
  constructor() {}

  setVariables(_c: Context) {}
}

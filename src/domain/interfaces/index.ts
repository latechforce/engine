import type { ITable } from './ITable'
import type { IAutomation } from './IAutomation'
import type { IServices } from './IServices'
import type { IBucket } from './IBucket'
import type { IIntegrations } from './IIntegrations'
import type { IForm } from './IForm'
export interface Config extends IServices {
  name: string
  version: string
  engine: string
  description?: string
  forms?: IForm[]
  tables?: ITable[]
  buckets?: IBucket[]
  automations?: IAutomation[]
  integrations?: IIntegrations
}

export type AppSchema = Config

import type { BaseConfig } from '../base'

export interface QontoConfig extends BaseConfig {
  organisationSlug: string
  secretKey: string
  stagingToken?: string
}

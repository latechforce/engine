export interface QontoSandboxConfig extends Omit<QontoProductionConfig, 'environment'> {
  environment: 'sandbox'
  stagingToken: string
}

export interface QontoProductionConfig {
  environment: 'production'
  organisationSlug: string
  secretKey: string
}

export type QontoConfig = QontoSandboxConfig | QontoProductionConfig

import type { TableSchema } from './TableSchema'
import type { AutomationSchema } from './AutomationSchema'
import type { BucketSchema } from './BucketSchema'
import type { IntegrationSchema } from './IntegrationSchema'
import type { FormSchema } from './FormSchema'
import type { ServiceSchema } from './ServiceSchema'

/**
 * Engine configuration
 * @title Config
 * @description This is the configuration of the engine.
 */
export type ConfigSchema = {
  /**
   * Engine name
   * @description The name of the engine
   */
  name: string
  /**
   * Config version
   * @description The version of the config
   */
  appVersion?: string
  /**
   * Engine version
   * @description The version of the engine
   * @default version of package.json or latest
   */
  engineVersion?: string
  /**
   * Engine description
   * @description The description of the engine
   * @default @latechforce/engine version of package.json
   */
  description?: string
  /**
   * Forms
   * @description The forms of the engine
   */
  forms?: FormSchema[]
  /**
   * Automations
   * @description The automations of the engine
   */
  automations?: AutomationSchema[]
  /**
   * Tables
   * @description The tables of the engine
   */
  tables?: TableSchema[]
  /**
   * Buckets
   * @description The buckets of the engine
   */
  buckets?: BucketSchema[]
  /**
   * Integrations
   * @description The integrations of the engine
   */
  integrations?: IntegrationSchema
  /**
   * Services
   * @description The services of the engine
   */
  services?: ServiceSchema
}

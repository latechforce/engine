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
   * @description The name of the engine.
   */
  name: string
  /**
   * Config version
   * @description The version of the application.
   * @default "the `version` property of the `package.json` file or `latest`"
   */
  appVersion?: string
  /**
   * Engine version
   * @description The version of the engine.
   * @default "the `version` of the dependency `@latechforce/engine` of the `package.json` file"
   */
  engineVersion?: string
  /**
   * Engine description
   * @description The description of the application.
   */
  description?: string
  /**
   * Forms
   * @description The forms of the application.
   */
  forms?: FormSchema[]
  /**
   * Automations
   * @description The automations of the application.
   */
  automations?: AutomationSchema[]
  /**
   * Tables
   * @description The tables of the application.
   */
  tables?: TableSchema[]
  /**
   * Buckets
   * @description The buckets of the application.
   */
  buckets?: BucketSchema[]
  /**
   * Integrations
   * @description The integrations of the application.
   */
  integrations?: IntegrationSchema
  /**
   * Services
   * @description The services of the application.
   */
  services?: ServiceSchema
}

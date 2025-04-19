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
export interface ConfigSchema {
  /**
   * The name of the engine
   * @title Name
   * @description The name of the engine
   */
  name: string

  /**
   * The version of the application
   * @title App Version
   * @description The version of the application
   * @default "the `version` property of the `package.json` file or `latest`"
   */
  appVersion?: string

  /**
   * The version of the engine
   * @title Engine Version
   * @description The version of the engine
   * @default "the `version` of the dependency `@latechforce/engine` of the `package.json` file"
   */
  engineVersion?: string

  /**
   * The description of the application
   * @title Description
   * @description The description of the application
   */
  description?: string

  /**
   * The forms of the application
   * @title Forms
   * @description The forms of the application
   */
  forms?: FormSchema[]

  /**
   * The automations of the application
   * @title Automations
   * @description The automations of the application
   */
  automations?: AutomationSchema[]

  /**
   * The tables of the application
   * @title Tables
   * @description The tables of the application
   */
  tables?: TableSchema[]

  /**
   * The buckets of the application
   * @title Buckets
   * @description The buckets of the application
   */
  buckets?: BucketSchema[]

  /**
   * The integrations of the application
   * @title Integrations
   * @description The integrations of the application
   */
  integrations?: IntegrationSchema

  /**
   * The services of the application
   * @title Services
   * @description The services of the application
   */
  services?: ServiceSchema
}

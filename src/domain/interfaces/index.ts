import type { ITable } from './ITable'
import type { IAutomation } from './IAutomation'
import type { IServices } from './IServices'
import type { IBucket } from './IBucket'
import type { IIntegrations } from './IIntegrations'
import type { IForm } from './IForm'

/**
 * Engine configuration
 * @title Engine configuration
 * @description This is the configuration of the engine.
 */
export interface Config extends IServices {
  /**
   * App name
   * @description This is the name of the app.
   * @example "My App"
   */
  name: string
  /**
   * App version
   * @description This is the version of the app.
   * @example "1.0.0"
   */
  version: string
  /**
   * Engine version
   * @description This is the version of the engine.
   * @example "1.0.0"
   */
  engine: string
  /**
   * App description
   * @description This is the description of the app.
   * @example "My App description"
   */
  description?: string
  /**
   * Forms
   * @description This is the list of forms of the app.
   */
  forms?: IForm[]
  /**
   * Tables
   * @description This is the list of tables of the app.
   */
  tables?: ITable[]
  /**
   * Buckets
   * @description This is the list of buckets of the app.
   */
  buckets?: IBucket[]
  /**
   * Automations
   * @description This is the list of automations of the app.
   */
  automations?: IAutomation[]
  /**
   * Integrations
   * @description This is the list of integrations of the app.
   */
  integrations?: IIntegrations
}

export type AppSchema = Config

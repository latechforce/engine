import type { ReadRecordDatabaseServiceActionAutomationSchema } from './Database/ReadRecordSchema'
import type { CreateRecordDatabaseServiceActionAutomationSchema } from './Database/CreateRecordSchema'
import type { RunJavascriptCodeServiceActionAutomationSchema } from './Code/RunJavascriptSchema'
import type { RunTypescriptCodeServiceActionAutomationSchema } from './Code/RunTypescriptSchema'

/**
 * Service action type union
 * @title Service
 * @description Union type of all possible service actions that can be performed in automations
 * @example
 * {
 *   service: 'Service',
 *   action: 'RunJavascript',
 *   code: 'console.log("Hello, world!");'
 * }
 */
export type ServiceActionAutomationSchema =
  | RunJavascriptCodeServiceActionAutomationSchema
  | RunTypescriptCodeServiceActionAutomationSchema
  | CreateRecordDatabaseServiceActionAutomationSchema
  | ReadRecordDatabaseServiceActionAutomationSchema

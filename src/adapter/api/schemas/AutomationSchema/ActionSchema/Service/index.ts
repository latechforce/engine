import type { CodeServiceActionAutomationSchema } from './Code'
import type { DatabaseServiceActionAutomationSchema } from './Database'

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
  | CodeServiceActionAutomationSchema
  | DatabaseServiceActionAutomationSchema

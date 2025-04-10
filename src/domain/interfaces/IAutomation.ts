import type { AutomationConfig } from '../entities/Automation'
import type { IAction } from './IAction'
import type { ITrigger } from './ITrigger'

/**
 * Automation configuration interface
 * @title Automation configuration
 * @description Defines an automation workflow with triggers and actions
 */
export interface IAutomation extends AutomationConfig {
  /**
   * Trigger configuration
   * @description The event or condition that starts the automation
   * @example {
   *   service: 'Http',
   *   trigger: 'ApiCalled',
   *   method: 'POST',
   *   path: '/webhook',
   *   headers: {
   *     'Content-Type': 'application/json'
   *   }
   * }
   */
  trigger: ITrigger
  /**
   * Action configurations
   * @description List of actions to be executed when the trigger is activated
   * @example [
   *   {
   *     service: 'Database',
   *     action: 'CreateRecord',
   *     table: 'users',
   *     fields: {
   *       name: '{{trigger.payload.name}}',
   *       email: '{{trigger.payload.email}}'
   *     }
   *   },
   *   {
   *     integration: 'GoogleMail',
   *     action: 'SendEmail',
   *     email: {
   *       to: '{{trigger.payload.email}}',
   *       subject: 'Welcome to our platform',
   *       text: 'Hello {{trigger.payload.name}}!'
   *     }
   *   }
   * ]
   */
  actions: IAction[]
}

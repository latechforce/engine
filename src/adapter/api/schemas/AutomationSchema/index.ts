import type { AutomationConfig } from '/domain/entities/Automation'
import type { TriggerAutomationSchema } from './TriggerSchema'
import type { ActionAutomationSchema } from './ActionSchema'

/**
 * Automation configuration interface
 * @title Automation
 * @description Defines an automation workflow with triggers and actions
 */
export interface AutomationSchema extends AutomationConfig {
  /**
   * Automation name
   * @title Name
   * @description The name of the automation.
   */
  name: string
  /**
   * Automation description
   * @title Description
   * @description The description of the automation.
   */
  description?: string
  /**
   * Automation trigger
   * @title Trigger
   * @description The trigger that starts the automation.
   */
  trigger: TriggerAutomationSchema
  /**
   * Automation actions
   * @title Actions
   * @description The actions that are executed when the trigger is activated.
   */
  actions: ActionAutomationSchema[]
}

import type { AutomationConfig } from '/domain/entities/Automation'
import type { TriggerAutomationSchema } from './TriggerSchema'
import type { ActionAutomationSchema } from './ActionSchema'

/**
 * Automation configuration interface
 * @title Automation
 * @description Defines an automation workflow with triggers and actions
 */
export interface AutomationSchema extends AutomationConfig {
  trigger: TriggerAutomationSchema
  actions: ActionAutomationSchema[]
}

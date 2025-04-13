import type { CronTimeTickedScheduleTriggerConfig } from '/domain/entities/Trigger/services/schedule/CronTimeTicked'

/**
 * Cron Time Ticked Schedule Trigger
 * @title Cron Time Ticked
 * @description A trigger that fires when a cron time is ticked
 */
export interface CronTimeTickedScheduleTriggerSchema
  extends Omit<CronTimeTickedScheduleTriggerConfig, 'automation'> {
  service: 'Schedule'
  event: 'CronTimeTicked'
}

import type { CronTimeTickedScheduleTriggerConfig } from '/domain/entities/Trigger/services/schedule/CronTimeTicked'

/**
 * Cron Time Ticked Schedule Trigger
 * @title Cron Time Ticked
 * @description A trigger that fires when a cron time is ticked
 */
export interface CronTimeTickedScheduleServiceTriggerAutomationSchema {
  /**
   * The service type for this trigger
   * @title Service
   * @description The service type for this trigger
   */
  service: 'Schedule'
  /**
   * The event type for this trigger
   * @title Event
   * @description The event type for this trigger
   */
  event: 'CronTimeTicked'
  /**
   * The cron time for this trigger
   * @title Cron Time
   * @description The cron time for this trigger
   */
  cronTime: CronTimeTickedScheduleTriggerConfig['cronTime']
}

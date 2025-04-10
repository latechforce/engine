import type { CronTimeTickedScheduleTriggerConfig } from '/domain/entities/Trigger/services/schedule/CronTimeTicked'

export interface ICronTimeTickedScheduleTrigger
  extends Omit<CronTimeTickedScheduleTriggerConfig, 'automation'> {
  service: 'Schedule'
  event: 'CronTimeTicked'
}

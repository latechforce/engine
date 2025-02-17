import type { CronTimeTickedScheduleTriggerConfig } from '/domain/entities/Trigger/schedule/CronTimeTicked'

export interface ICronTimeTickedScheduleTrigger
  extends Omit<CronTimeTickedScheduleTriggerConfig, 'automation'> {
  service: 'Schedule'
  event: 'CronTimeTicked'
}

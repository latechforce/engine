import {
  CronTimeTickedScheduleTrigger,
  type CronTimeTickedScheduleTriggerConfig,
  type CronTimeTickedScheduleTriggerServices,
} from '/domain/entities/Trigger/schedule/CronTimeTicked'

export class CronTimeTickedScheduleTriggerMapper {
  static toEntity = (
    config: CronTimeTickedScheduleTriggerConfig,
    services: CronTimeTickedScheduleTriggerServices
  ): CronTimeTickedScheduleTrigger => {
    return new CronTimeTickedScheduleTrigger(config, services)
  }
}

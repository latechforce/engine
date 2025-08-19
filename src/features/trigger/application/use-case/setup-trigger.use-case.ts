import { injectable, inject } from 'inversify'
import type { Automation } from '../../../../features/automation/domain/entity/automation.entity'
import type { App } from '../../../../features/app/domain/entity/app.entity'
import type { ITriggerRepository } from '../../domain/repository-interface/trigger-repository.interface'
import TYPES from '../../../../shared/application/di/types'
import type { RecordRow } from '../../../../features/table/domain/object-value/record-row.object-value'
import type { IRecordRepository } from '../../../../features/table/domain/repository-interface/record-repository.interface'
import { Run } from '../../../../features/run/domain/entity/run.entity'
import type { IRunRepository } from '../../../../features/run/domain/repository-interface/run-repository.interface'
import { toRecordDto } from '../../../../features/table/application/dto/record.dto'
import type { IAutomationRepository } from '../../../../features/automation/domain/repository-interface/automation-repository.interface'
import { TriggerError } from '../../domain/entity/trigger-error.entity'

@injectable()
export class SetupTriggerUseCase {
  constructor(
    @inject(TYPES.Trigger.Repository)
    private readonly triggerRepository: ITriggerRepository,
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository,
    @inject(TYPES.Table.Repository.Record)
    private readonly recordRepository: IRecordRepository,
    @inject(TYPES.Automation.Repository)
    private readonly automationRepository: IAutomationRepository
  ) {}

  async execute(app: App, automation: Automation) {
    this.triggerRepository.log.debug(`setup trigger for "${automation.schema.name}"`)
    const { trigger } = automation
    const status = await this.automationRepository.status.get(automation.schema.id)
    if (!status) throw new TriggerError('Automation status not found', 404)
    if (status.active) {
      if ('account' in trigger) {
        const connection = app.findConnection(trigger.account)
        if (!connection) {
          throw new Error(`Connection "${trigger.account}" not found`)
        }
        const filledTrigger = this.triggerRepository.fillTriggerWithEnv(trigger)
        const success = await this.triggerRepository.setupIntegration(
          filledTrigger,
          connection,
          automation
        )
        if (!success) {
          await this.automationRepository.status.setActive(automation.schema.id, false)
          this.triggerRepository.log.debug(
            `failed to setup integration for "${automation.schema.name}", automation is now inactive`
          )
        }
      } else {
        switch (trigger.service) {
          case 'database': {
            switch (trigger.event) {
              case 'record-created': {
                const table = app.findTable(trigger.params.table)
                if (!table) {
                  throw new Error(`Table "${trigger.params.table}" not found`)
                }
                this.recordRepository.onRecordCreated(async (recordRow: RecordRow) => {
                  if (recordRow.tableId === table.schema.id) {
                    const record = await this.recordRepository.read(table, recordRow.id)
                    if (!record) {
                      throw new Error(`Record "${recordRow.id}" not found`)
                    }
                    const run = new Run(automation.schema.id, [
                      {
                        type: 'trigger',
                        schema: trigger,
                        output: toRecordDto(record),
                      },
                    ])
                    await this.runRepository.create(run)
                  }
                })
                break
              }
              case 'record-updated': {
                const table = app.findTable(trigger.params.table)
                if (!table) {
                  throw new Error(`Table "${trigger.params.table}" not found`)
                }
                this.recordRepository.onRecordUpdated(async (recordRow: RecordRow) => {
                  if (recordRow.tableId === table.schema.id) {
                    const record = await this.recordRepository.read(table, recordRow.id)
                    if (!record) {
                      throw new Error(`Record "${recordRow.id}" not found`)
                    }
                    const run = new Run(automation.schema.id, [
                      {
                        type: 'trigger',
                        schema: trigger,
                        output: toRecordDto(record),
                      },
                    ])
                    await this.runRepository.create(run)
                  }
                })
                break
              }
              default: {
                const _exhaustiveCheck: never = trigger
                throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
              }
            }
            break
          }
          case 'http': {
            break
          }
          case 'schedule': {
            switch (trigger.event) {
              case 'cron-time': {
                const { expression, timeZone } = trigger.params
                this.triggerRepository.onCronTime(expression, timeZone, async () => {
                  const date = new Date()
                  const run = new Run(automation.schema.id, [
                    {
                      type: 'trigger',
                      schema: trigger,
                      output: {
                        dateTime: date.toISOString(),
                        timestamp: date.getTime(),
                      },
                    },
                  ])
                  await this.runRepository.create(run)
                })
                break
              }
              default: {
                const _exhaustiveCheck: never = trigger
                throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
              }
            }
            break
          }
          default: {
            const _exhaustiveCheck: never = trigger
            throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
          }
        }
      }
    }
  }
}

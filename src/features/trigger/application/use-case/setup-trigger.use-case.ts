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

@injectable()
export class SetupTriggerUseCase {
  constructor(
    @inject(TYPES.Trigger.Repository)
    private readonly triggerRepository: ITriggerRepository,
    @inject(TYPES.Run.Repository)
    private readonly runRepository: IRunRepository,
    @inject(TYPES.Table.Repository.Record)
    private readonly recordRepository: IRecordRepository
  ) {}

  async execute(app: App, automation: Automation) {
    this.triggerRepository.debug(`setup trigger for "${automation.schema.name}"`)
    const { trigger } = automation
    if ('account' in trigger) {
      const connection = app.findConnection(trigger.account)
      if (!connection) {
        throw new Error(`Connection "${trigger.account}" not found`)
      }
      await this.triggerRepository.setupIntegration(trigger, connection, automation)
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
                      schema: trigger,
                      output: toRecordDto(record, table),
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
                      schema: trigger,
                      output: toRecordDto(record, table),
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

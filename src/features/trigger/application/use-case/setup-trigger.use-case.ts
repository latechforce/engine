import { injectable, inject } from 'inversify'
import type { Automation } from '../../../../features/automation/domain/entity/automation.entity'
import type { App } from '../../../../features/app/domain/entity/app.entity'
import type { ITriggerRepository } from '../../domain/repository-interface/trigger-repository.interface'
import { IntegrationTrigger } from '../../domain/entity/integration-trigger.entity'
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
    if (trigger instanceof IntegrationTrigger) {
      await this.triggerRepository.setupIntegration(trigger)
    } else {
      const { schema } = trigger
      switch (schema.service) {
        case 'database': {
          const table = app.findTable(schema.table)
          if (!table) {
            throw new Error(`Table "${schema.table}" not found`)
          }
          switch (schema.event) {
            case 'record-created': {
              this.recordRepository.onRecordCreated(async (recordRow: RecordRow) => {
                if (recordRow.tableId === table.schema.id) {
                  const record = await this.recordRepository.read(table, recordRow.id)
                  if (!record) {
                    throw new Error(`Record "${recordRow.id}" not found`)
                  }
                  const run = new Run(automation.schema, { trigger: toRecordDto(record) })
                  await this.runRepository.create(run)
                }
              })
              break
            }
            case 'record-updated': {
              this.recordRepository.onRecordUpdated(async (recordRow: RecordRow) => {
                if (recordRow.tableId === table.schema.id) {
                  const record = await this.recordRepository.read(table, recordRow.id)
                  if (!record) {
                    throw new Error(`Record "${recordRow.id}" not found`)
                  }
                  const run = new Run(automation.schema, { trigger: toRecordDto(record) })
                  await this.runRepository.create(run)
                }
              })
              break
            }
            default: {
              const _exhaustiveCheck: never = schema
              throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
            }
          }
          break
        }
        case 'http': {
          break
        }
        default: {
          const _exhaustiveCheck: never = schema
          throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
        }
      }
    }
  }
}

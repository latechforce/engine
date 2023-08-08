import { OrmGatewayAbstract } from '@application/gateways/OrmGatewayAbstract'
import { Record } from '@domain/entities/app/Record'
import { SyncResource, SyncTables } from '@domain/entities/app/Sync'
import { ListTableRecords } from './ListTableRecords'
import { App } from '@domain/entities/app/App'
import { SoftDeleteManyTableRecords } from './SoftDeleteManyTableRecords'

export interface TableToHandle {
  table: string
  records: Record[]
}

export class SyncTableRecords {
  private listTableRecord: ListTableRecords
  private softDeleteManyRecords: SoftDeleteManyTableRecords

  constructor(
    private ormGateway: OrmGatewayAbstract,
    app: App
  ) {
    this.softDeleteManyRecords = new SoftDeleteManyTableRecords(ormGateway, app)
    this.listTableRecord = new ListTableRecords(ormGateway, app)
  }

  async execute(records: Record[] = [], resources: SyncResource[] = []): Promise<SyncTables> {
    if (records.length > 0) {
      const recordsToCreate: TableToHandle[] = []
      const recordsToUpdate: TableToHandle[] = []
      const recordsToDelete: TableToHandle[] = []
      for (const record of records) {
        switch (record.state) {
          case 'create':
            const recordsToCreateTable = recordsToCreate.find((r) => r.table === record.tableName)
            if (recordsToCreateTable) {
              recordsToCreateTable.records.push(record)
            } else {
              recordsToCreate.push({
                table: record.tableName,
                records: [record],
              })
            }
            break
          case 'update':
            const recordsToUpdateTable = recordsToUpdate.find((r) => r.table === record.tableName)
            if (recordsToUpdateTable) {
              recordsToUpdateTable.records.push(record)
            } else {
              recordsToUpdate.push({
                table: record.tableName,
                records: [record],
              })
            }
            break
          case 'delete':
            const recordsToDeleteTable = recordsToDelete.find((r) => r.table === record.tableName)
            if (recordsToDeleteTable) {
              recordsToDeleteTable.records.push(record)
            } else {
              recordsToDelete.push({
                table: record.tableName,
                records: [record],
              })
            }
            break
          default:
            throw new Error(`Record state "${record.state}" not supported`)
        }
      }
      const promises = []
      for (const { table, records } of recordsToCreate) {
        promises.push(this.ormGateway.createMany(table, records))
      }
      for (const { table, records } of recordsToUpdate) {
        promises.push(this.ormGateway.updateMany(table, records))
      }
      for (const { table, records } of recordsToDelete) {
        promises.push(
          this.softDeleteManyRecords.execute(
            table,
            records.map((r) => r.id)
          )
        )
      }
      await Promise.all(promises)
    }

    const tables: SyncTables = {}

    if (resources.length > 0) {
      const promises = []
      for (const { table, filters } of resources) {
        promises.push(
          this.listTableRecord
            .execute(table, filters ?? [])
            .then((records) => (tables[table] = records))
        )
      }
      await Promise.all(promises)
    }

    return tables
  }
}
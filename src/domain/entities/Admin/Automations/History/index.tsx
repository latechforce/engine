import { BaseAdmin, type BaseAdminServices } from '../../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components, TableColumn, TableRow } from '/domain/components'
import type { Automation } from '/domain/entities/Automation'
import { format } from 'date-fns'
import { IsTextFilter } from '/domain/entities/Filter/text/Is'
import type { GetRequest } from '/domain/entities/Request'
import { AutomationHistory } from '/domain/entities/Automation/History'
import { OrFilter } from '/domain/entities/Filter/Or'
import { ContainsTextFilter } from '/domain/entities/Filter/text/Contains'
import type { Filter } from '/domain/entities/Filter'
import { AndFilter } from '/domain/entities/Filter/And'

type AutomationHistoryReadModel = {
  automation: {
    name: string
    actions_count: number
  }
  created_at: Date
  status: string
}

export class AdminAutomationsHistory extends BaseAdmin {
  protected readonly _automations: Automation[]
  protected _automationsHistory: AutomationHistoryReadModel[]
  protected _automationsHistoryCount: number
  protected _automationsHistoryService?: AutomationHistory

  constructor(services: BaseAdminServices, components: Components, automations: Automation[]) {
    super(services, components)
    this._automations = automations
    this._automationsHistory = []
    this._automationsHistoryCount = 0
    if (this._automations.length > 0) {
      this._automationsHistoryService = new AutomationHistory(this._automations[0].services)
    }
  }

  init = async () => {
    await super.init('/admin/automations/history')
  }

  get = async (req?: GetRequest) => {
    let page = Number(req?.getQuery('page') ?? 1)
    const q = req?.getQuery('q')
    const tableId = 'automation-history-table'

    let isHtmxRequest = false
    if (req?.headers?.['hx-target'] && req.headers['hx-target'] === tableId) {
      isHtmxRequest = true
    }

    const filter: Filter[] = [
      ...this._automations.map((automation) => {
        return new IsTextFilter('automation_name', automation.name)
      }),
    ]
    let finalFilter: Filter = new OrFilter(filter)
    if (q) {
      finalFilter = new AndFilter([
        new ContainsTextFilter('automation_name', q),
        new OrFilter(filter),
      ])
    }

    if (this._automationsHistoryService) {
      const count = await this._automationsHistoryService.count({
        filter: finalFilter.toDto(),
      })

      if (Math.floor(count / 10) < page - 1) {
        page = 1
      }

      const records = await this._automationsHistoryService.list({
        filter: finalFilter,
        order: [{ field: 'created_at', direction: 'desc' }],
        page: { page, perPage: 10 },
      })

      if (records) {
        this._automationsHistoryCount = count

        this._automationsHistory = await records.map((history) => {
          let actionsData = []
          try {
            actionsData = JSON.parse(history.actions_data)
          } catch (error) {
            console.error(error)
          }
          return {
            automation: {
              name: history.automation_name,
              actions_count: actionsData.length,
            },
            created_at: history.created_at,
            status: history.status,
          }
        })
      }
    }
    const { H1, Table } = this._components

    const columns: TableColumn[] = [
      {
        label: 'Status',
        key: 'status',
      },
      {
        label: 'Name',
        key: 'name',
      },
      {
        label: 'Actions runned',
        key: 'actions_count',
      },
      {
        label: 'Runned At',
        key: 'created_at',
        formatter: (value: unknown) => {
          // Assuming 'format' from 'date-fns' is imported at the top of the file
          // import { format } from 'date-fns';
          try {
            const dateValue =
              value instanceof Date ? value : new Date(value as string | number | Date)
            // Check if the date is valid before formatting
            if (isNaN(dateValue.getTime())) {
              return 'Invalid Date'
            }
            return format(dateValue, 'dd/MM/yyyy HH:mm:ss')
          } catch (e) {
            console.error('Error formatting date:', e)
            // Fallback or error display
            return String(value)
          }
        },
      },
    ]
    const rows: TableRow[] = this._automationsHistory.map((item) => ({
      key: `${item.automation.name}`,
      name: item.automation.name,
      actions_count: item.automation.actions_count,
      created_at: item.created_at,
      status: item.status,
    }))

    if (isHtmxRequest) {
      return new JsxResponse(
        (
          <Table
            id={tableId}
            columns={columns}
            rows={rows}
            page={page}
            perPage={10}
            count={this._automationsHistoryCount}
            searchRoute={`/admin/automations/history`}
            query={q}
          />
        )
      )
    }

    return new JsxResponse(
      (
        <this.layout path="/admin/automations/history" title="Automations History">
          <H1>Automations History</H1>
          <Table
            id={tableId}
            columns={columns}
            rows={rows}
            page={page}
            perPage={10}
            count={this._automationsHistoryCount}
            searchRoute={`/admin/automations/history`}
            query={q}
          />
        </this.layout>
      )
    )
  }
}

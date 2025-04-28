import { BaseAdmin, type BaseAdminServices } from '../../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components, TableColumn, TableRow } from '/domain/components'
import type { Automation } from '/domain/entities/Automation'
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
  protected _automationsHistory: AutomationHistoryReadModel[] = []
  protected _automationsHistoryCount: number = 0
  protected _automationsHistoryService?: AutomationHistory

  constructor(
    services: BaseAdminServices,
    components: Components,
    protected readonly _automations: Automation[]
  ) {
    super(services, components)
    if (this._automations.length > 0) {
      this._automationsHistoryService = new AutomationHistory(this._automations[0].services)
    }
  }

  init = async () => {
    await super.init('/admin/automations/history')
  }

  get = async (req: GetRequest) => {
    let page = req.getQueryAsNumber('page', 1)
    const q = req.getQuery('q')
    const perPage = req.getQueryAsNumber('perPage', 10)

    const tableId = 'automation-history-table'

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
    const { Typography, Table } = this._components

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
          try {
            const dateValue =
              value instanceof Date ? value : new Date(value as string | number | Date)
            if (isNaN(dateValue.getTime())) {
              return 'Invalid Date'
            }
            return this._services.system.formatDate(dateValue, 'dd/MM/yyyy HH:mm:ss')
          } catch (e) {
            console.error('Error formatting date:', e)
            return String(value)
          }
        },
      },
    ]
    const rows: TableRow[] = this._automationsHistory.map((item) => ({
      key: item.automation.name,
      name: item.automation.name,
      actions_count: item.automation.actions_count,
      created_at: item.created_at,
      status: item.status,
    }))

    const searchRoute = `/admin/automations/history`

    const searchAttributes = this._services.client.getHtmlAttributes({
      get: searchRoute,
      trigger: 'keyup changed delay:500ms',
      pushUrl: 'true',
      target: `#${tableId}`,
    })

    const tableComponent = (
      <Table
        id={tableId}
        columns={columns}
        rows={rows}
        page={page}
        perPage={perPage}
        total={this._automationsHistoryCount}
        searchRoute={searchRoute}
        query={q}
        searchAttributes={searchAttributes}
      />
    )

    if (this.isClientRequest(req, tableId)) {
      return new JsxResponse(tableComponent)
    }

    return new JsxResponse(
      (
        <this.layout path="/admin/automations/history" title="Automations History">
          <Typography variant="h1">Automations History</Typography>
          {tableComponent}
        </this.layout>
      )
    )
  }
}

import { BaseAdmin, type BaseAdminServices } from '../../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components, TableColumn, TableRow } from '/domain/components'
import type { Automation } from '/domain/entities/Automation'
import type { AutomationHistoryRecordReadModel } from '/domain/entities/Automation/History'
import { format } from 'date-fns'
import { AndFilter } from '/domain/entities/Filter/And'
import { IsTextFilter } from '/domain/entities/Filter/text/Is'

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

  constructor(services: BaseAdminServices, components: Components, automations: Automation[]) {
    super(services, components)
    this._automations = automations
    this._automationsHistory = []
  }

  init = async () => {
    await super.init('/admin/automations/history')
  }

  get = async () => {
    const records = await Promise.all(
      this._automations.map(async (automation) => {
        const history = await automation.history.list(
          new AndFilter([new IsTextFilter('automation_name', automation.name)])
        )
        return history
      })
    )

    this._automationsHistory = await records
      .flat()
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .map((history: AutomationHistoryRecordReadModel) => {
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
    const { H1, Table, Search } = this._components

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

    return new JsxResponse(
      (
        <this.layout path="/admin/automations/history" title="Automations History">
          <H1>Automations History</H1>
          <div className="p-6">
            <div className="grid grid-cols-3">
              <Search field="search" placeholder="Search" />
            </div>
            <div className="grid grid-cols-4"></div>
          </div>
          <Table columns={columns} rows={rows} />
        </this.layout>
      )
    )
  }
}

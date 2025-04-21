import { BaseAdmin, type BaseAdminServices } from '../../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components, TableColumn, TableRow } from '/domain/components'
import type { Automation } from '/domain/entities/Automation'
import type { AutomationHistoryRecordReadModel } from '/domain/entities/Automation/History'
import { Search } from '/infrastructure/components/tailwindcss/BasicForms/Search'

type AutomationHistoryReadModel = {
  automation: {
    name: string
    actions_count: number
  }
  created_at: string
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
    const temp = await Promise.all(
      this._automations.map(async (automation) => {
        const history = await automation.history.list()
        return history
      })
    ).then((histories) => histories.flat())

    console.log(temp)

    this._automationsHistory = await temp.map((history: AutomationHistoryRecordReadModel) => {
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

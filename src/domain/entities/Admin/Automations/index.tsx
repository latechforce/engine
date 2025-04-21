import { BaseAdmin, type BaseAdminServices } from '../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components, TableColumn, TableRow } from '/domain/components'
import type { Automation } from '../../Automation'

export class AdminAutomations extends BaseAdmin {
  protected readonly _automations: Automation[]

  constructor(services: BaseAdminServices, components: Components, automations: Automation[]) {
    super(services, components)
    this._automations = automations
  }

  init = async () => {
    await super.init('/admin/automations')
  }

  get = async () => {
    const { H1, Table, Search } = this._components

    const columns: TableColumn[] = [
      {
        label: 'Name',
        key: 'name',
      },
      {
        label: 'Actions',
        key: 'actions_count',
      },
    ]
    const rows: TableRow[] = this._automations.map((item) => {
      return {
        key: `${item.name}`,
        name: item.name,
        actions_count: item.entities.actions.length,
      }
    })

    return new JsxResponse(
      (
        <this.layout path="/admin/automations" title="Automations">
          <H1>Automations</H1>
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

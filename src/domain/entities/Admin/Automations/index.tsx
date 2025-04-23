import { BaseAdmin, type BaseAdminServices } from '../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components, TableColumn, TableRow } from '/domain/components'
import type { Automation } from '../../Automation'
import type { GetRequest } from '../../Request'

export class AdminAutomations extends BaseAdmin {
  protected readonly _automations: Automation[]

  constructor(services: BaseAdminServices, components: Components, automations: Automation[]) {
    super(services, components)
    this._automations = automations
  }

  init = async () => {
    await super.init('/admin/automations')
  }

  get = async (req?: GetRequest) => {
    const page = Number(req?.getQuery('page') ?? 1)
    const q = req?.getQuery('q')
    const tableId = 'automation-table'

    let isHtmxRequest = false
    if (req?.headers?.['hx-target'] && req.headers['hx-target'] === tableId) {
      isHtmxRequest = true
    }
    const { H1, Table } = this._components

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

    let filteredAutomations = this._automations

    if (q) {
      filteredAutomations = filteredAutomations.filter((item) => {
        return item.name.toLowerCase().includes(q.toLowerCase())
      })
    }

    const rows: TableRow[] = filteredAutomations.slice((page - 1) * 10, page * 10).map((item) => {
      return {
        key: `${item.name}`,
        name: item.name,
        actions_count: item.entities.actions.length,
      }
    })

    const tableComponent = (
      <Table
        columns={columns}
        rows={rows}
        id={tableId}
        page={page}
        perPage={10}
        count={this._automations.length}
        searchRoute={`/admin/automations`}
        query={q}
      />
    )

    if (isHtmxRequest) {
      return new JsxResponse(tableComponent)
    }

    return new JsxResponse(
      (
        <this.layout path="/admin/automations" title="Automations">
          <H1>Automations</H1>
          {tableComponent}
        </this.layout>
      )
    )
  }
}

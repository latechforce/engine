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

  get = async (req: GetRequest) => {
    const page = req.getQueryAsNumber('page', 1)
    const q = req.getQuery('q')
    const perPage = req.getQueryAsNumber('perPage', 10)

    const tableId = 'automation-table'

    const { Typography, Table } = this._components

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

    const searchRoute = `/admin/automations`

    const searchAttributes = this._services.client.getHtmlAttributes({
      get: searchRoute,
      trigger: 'keyup changed delay:500ms',
      pushUrl: 'true',
      target: `#${tableId}`,
    })

    const tableComponent = (
      <Table
        columns={columns}
        rows={rows}
        id={tableId}
        page={page}
        perPage={perPage}
        total={this._automations.length}
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
        <this.layout path="/admin/automations" title="Automations">
          <Typography variant="h1">Automations</Typography>
          {tableComponent}
        </this.layout>
      )
    )
  }
}

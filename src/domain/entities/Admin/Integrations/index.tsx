import { BaseAdmin, type BaseAdminServices } from '../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components, TableAction, TableColumn, TableRow } from '/domain/components'
import type { Integrations } from '/domain/integrations'

export class AdminIntegrations extends BaseAdmin {
  constructor(
    services: BaseAdminServices,
    components: Components,
    private _integrations: Integrations
  ) {
    super(services, components)
  }

  init = async () => {
    await super.init('/admin/integrations')
  }

  get = async () => {
    const { system, client, server } = this._services
    const integrations = Object.entries(this._integrations)
    const { Table } = this._components
    const columns: TableColumn[] = [
      {
        label: 'Name',
        key: 'name',
      },
      {
        label: 'Account',
        key: 'account',
      },
      {
        label: 'Auth Type',
        key: 'auth',
      },
    ]
    const rows: TableRow[] = integrations
      .filter(([, integration]) => integration.isUsed)
      .map(([name, integration]) =>
        integration.accounts.map((account: string) => ({
          key: name,
          name: system.capitalize(name),
          auth: integration.auth,
          account,
          authorizationUrl: integration.authorizationUrl(
            account,
            `${server.baseUrl}/admin/integrations/${name}/callback`
          ),
        }))
      )
      .flat()
    const actions: TableAction[] = [
      (row: TableRow) => {
        if (row.auth === 'OAuth') {
          return {
            label: 'Connect account',
            aAttributes: {
              href: row.authorizationUrl,
              target: '_blank',
            },
          }
        }
        return {
          label: 'Test connection',
          aAttributes: client.getHtmlAttributes({
            post: `/api/integration/${row.key}/test-connection`,
            values: JSON.stringify({
              account: row.account,
            }),
          }),
        }
      },
    ]
    return new JsxResponse(
      (
        <this.layout path="/admin/integrations" title="Integrations | Admin">
          {/* TODO: Add Typography component */}
          <h1 className="p-6 text-4xl dark:text-white">Integrations</h1>
          <Table columns={columns} rows={rows} actions={actions} />
        </this.layout>
      )
    )
  }
}

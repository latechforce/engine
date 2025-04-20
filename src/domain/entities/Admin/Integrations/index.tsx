import { BaseAdmin, type BaseAdminServices } from '../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components, DropdownProps, TableColumn, TableRow } from '/domain/components'
import type { Integration, Integrations } from '/domain/integrations'
import { OAuthIntegration } from '../../../integrations/OAudth'
import { RedirectResponse } from '../../Response/Redirect'
import type { GetRequest } from '../../Request'

type IntegrationAccount = {
  name: string
  account: string
  integration: Integration
}

export class AdminIntegrations extends BaseAdmin {
  private _integrationAccounts: IntegrationAccount[] = []

  constructor(services: BaseAdminServices, components: Components, integrations: Integrations) {
    super(services, components)
    this._integrationAccounts = Object.entries(integrations)
      .filter(([, integration]) => integration.isUsed)
      .map(([name, integration]) =>
        integration.accounts.map((account: string) => {
          return {
            name,
            account,
            integration,
          }
        })
      )
      .flat()
  }

  init = async () => {
    await super.init('/admin/integrations')
    const { server } = this._services
    for (const { account, integration } of this._integrationAccounts) {
      if (integration instanceof OAuthIntegration) {
        await server.get(integration.redirectPath(), async (req: GetRequest) => {
          const { code } = req.query
          if (code && typeof code === 'string') {
            await integration.getAccessTokenFromCode(account, code)
          }
          return new RedirectResponse(`/admin/integrations`)
        })
      }
    }
  }

  get = async () => {
    const { system, theme, client } = this._services
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
      {
        label: 'Connected',
        key: 'connected',
      },
    ]
    const rows: TableRow[] = await Promise.all(
      this._integrationAccounts.map(async ({ name, account, integration }) => ({
        key: `${name}-${account}`,
        name: system.capitalize(name),
        auth: integration.auth,
        account: account,
        connected:
          integration instanceof OAuthIntegration
            ? (await integration.isConnected(account))
              ? theme.icon('link')
              : theme.icon('unlink')
            : theme.icon('link'),
        authorizationUrl:
          integration instanceof OAuthIntegration ? integration.authorizationUrl(account) : '',
      }))
    )
    const dropdown = (row: TableRow) => {
      const props: DropdownProps = {
        label: theme.icon('ellipsis-vertical'),
        items: [
          {
            label: 'Test connection',
            aAttributes: client.getHtmlAttributes({
              post: `/api/integration/${String(row.name).toLowerCase()}/test-connection`,
              values: JSON.stringify({
                account: row.account,
              }),
            }),
          },
        ],
      }
      if (row.auth === 'OAuth') {
        props.items.push({
          label: 'Connect account',
          aAttributes: {
            href: String(row.authorizationUrl),
            target: '_blank',
          },
        })
      }
      return props
    }
    return new JsxResponse(
      (
        <this.layout path="/admin/integrations" title="Integrations">
          {/* TODO: Add Typography component */}
          <h1 className="p-6 text-4xl dark:text-white">Integrations</h1>
          <Table columns={columns} rows={rows} dropdown={dropdown} />
        </this.layout>
      )
    )
  }
}

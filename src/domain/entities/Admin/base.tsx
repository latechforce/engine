import type { GetRequest } from '../Request'
import type { JsxResponse } from '../Response/Jsx'
import type { Components } from '/domain/components'
import type { Client, Server, System, Theme } from '/domain/services'

export type BaseAdminServices = {
  server: Server
  theme: Theme
  client: Client
  system: System
}

export class BaseAdmin {
  constructor(
    protected readonly _services: BaseAdminServices,
    protected readonly _components: Components
  ) {}

  async init(path: string) {
    const { server } = this._services
    await server.get(path, this.get)
  }

  get = async (req?: GetRequest): Promise<JsxResponse> => {
    throw new Error('Not implemented')
  }

  protected layout = (props: { title: string; path: string; children: React.ReactNode }) => {
    const { theme, client } = this._services
    const { Page, Sidebar } = this._components
    return (
      <Page title={`${props.title} | Admin`} cssFiles={theme.cssFiles} jsFiles={theme.jsFiles}>
        <Sidebar
          brand="Admin"
          brandHref="/admin"
          items={[
            {
              type: 'single',
              label: 'Dashboard',
              href: '/admin',
              icon: theme.icon('gauge'),
              active: props.path === '/admin',
              aAttributes: client.getHtmlAttributes({
                get: '/admin',
                target: 'body',
                pushUrl: 'true',
              }),
            },
            {
              type: 'single',
              label: 'Forms',
              href: '/admin/forms',
              icon: theme.icon('text-cursor-input'),
              active: props.path === '/admin/forms',
              aAttributes: client.getHtmlAttributes({
                get: '/admin/forms',
                action: 'replace',
                target: 'body',
                pushUrl: 'true',
              }),
            },
            {
              type: 'with-children',
              label: 'Automations',
              icon: theme.icon('bot'),
              active: props.path.startsWith('/admin/automations'),
              children: [
                {
                  type: 'single',
                  label: 'Automations',
                  href: '/admin/automations',
                  icon: theme.icon('gallery-vertical-end'),
                  active: props.path === '/admin/automations',
                  aAttributes: client.getHtmlAttributes({
                    get: '/admin/automations',
                    action: 'replace',
                    target: 'body',
                    pushUrl: 'true',
                  }),
                },
                {
                  type: 'single',
                  label: 'History',
                  href: '/admin/automations/history',
                  icon: theme.icon('history'),
                  active: props.path === '/admin/automations/history',
                  aAttributes: client.getHtmlAttributes({
                    get: '/admin/automations/history',
                    action: 'replace',
                    target: 'body',
                    pushUrl: 'true',
                  }),
                },
              ],
            },
            {
              type: 'single',
              label: 'Tables',
              href: '/admin/tables',
              icon: theme.icon('table-properties'),
              active: props.path === '/admin/tables',
              aAttributes: client.getHtmlAttributes({
                get: '/admin/tables',
                action: 'replace',
                target: 'body',
                pushUrl: 'true',
              }),
            },
            {
              type: 'single',
              label: 'Integrations',
              href: '/admin/integrations',
              icon: theme.icon('cable'),
              active: props.path === '/admin/integrations',
              aAttributes: client.getHtmlAttributes({
                get: '/admin/integrations',
                action: 'replace',
                target: 'body',
                pushUrl: 'true',
              }),
            },
          ]}
        >
          {props.children}
        </Sidebar>
      </Page>
    )
  }
}

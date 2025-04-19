import type { JsxResponse } from '../Response/Jsx'
import type { Components } from '/domain/components'
import type { Server, Theme } from '/domain/services'

export type BaseAdminServices = {
  server: Server
  theme: Theme
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

  get = async (): Promise<JsxResponse> => {
    throw new Error('Not implemented')
  }

  protected layout = (props: { title: string; path: string; children: React.ReactNode }) => {
    const { theme } = this._services
    const { Page, Sidebar } = this._components
    return (
      <Page title={props.title} cssFiles={theme.cssFiles} jsFiles={theme.jsFiles}>
        <Sidebar
          brand="Admin"
          brandHref="/admin"
          items={[
            {
              label: 'Dashboard',
              href: '/admin',
              icon: theme.icon('gauge'),
              active: props.path === '/admin',
            },
            {
              label: 'Forms',
              href: '/admin/forms',
              icon: theme.icon('text-cursor-input'),
              active: props.path === '/admin/forms',
            },
            {
              label: 'Automations',
              href: '/admin/automations',
              icon: theme.icon('bot'),
              active: props.path === '/admin/automations',
            },
            {
              label: 'Tables',
              href: '/admin/tables',
              icon: theme.icon('table-properties'),
              active: props.path === '/admin/tables',
            },
            {
              label: 'Integrations',
              href: '/admin/integrations',
              icon: theme.icon('cable'),
              active: props.path === '/admin/integrations',
            },
          ]}
        >
          {props.children}
        </Sidebar>
      </Page>
    )
  }
}

import { JsxResponse } from '../Response/Jsx'
import type { Components } from '/domain/components'
import type { Server } from '/domain/services'
import { Theme } from '/domain/services'
import { BaseAdmin } from './base'
import { AdminTables } from './Tables'
import { AdminIntegrations } from './Integrations'
import { AdminForms } from './Forms'
import { AdminAutomations } from './Automations'

export type AdminServices = {
  server: Server
  theme: Theme
}

export class Admin extends BaseAdmin {
  private readonly _tables: AdminTables
  private readonly _integrations: AdminIntegrations
  private readonly _forms: AdminForms
  private readonly _automations: AdminAutomations

  constructor(services: AdminServices, components: Components) {
    super(services, components)
    this._tables = new AdminTables(services, components)
    this._integrations = new AdminIntegrations(services, components)
    this._automations = new AdminAutomations(services, components)
    this._forms = new AdminForms(services, components)
  }

  init = async () => {
    super.init('/admin')
    await this._tables.init()
    await this._integrations.init()
    await this._automations.init()
    await this._forms.init()
  }

  get = async () => {
    return new JsxResponse(
      (
        <this.layout path="/admin" title="Dashboard | Admin">
          <h1>Dashboard</h1>
        </this.layout>
      )
    )
  }
}

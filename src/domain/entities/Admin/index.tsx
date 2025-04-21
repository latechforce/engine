import { JsxResponse } from '../Response/Jsx'
import type { Components } from '/domain/components'
import { BaseAdmin, type BaseAdminServices } from './base'
import { AdminTables } from './Tables'
import { AdminIntegrations } from './Integrations'
import { AdminForms } from './Forms'
import { AdminAutomations } from './Automations'
import type { Integrations } from '/domain/integrations'
import { AdminAutomationsHistory } from './Automations/History'

export class Admin extends BaseAdmin {
  private readonly _tables: AdminTables
  private readonly _integrations: AdminIntegrations
  private readonly _forms: AdminForms
  private readonly _automations: AdminAutomations
  private readonly _automationsHistory: AdminAutomationsHistory

  constructor(services: BaseAdminServices, components: Components, integrations: Integrations) {
    super(services, components)
    this._tables = new AdminTables(services, components)
    this._integrations = new AdminIntegrations(services, components, integrations)
    this._automations = new AdminAutomations(services, components)
    this._forms = new AdminForms(services, components)
    this._automationsHistory = new AdminAutomationsHistory(services, components)
  }

  init = async () => {
    await super.init('/admin')
    await this._tables.init()
    await this._integrations.init()
    await this._automations.init()
    await this._forms.init()
    await this._automationsHistory.init()
  }

  get = async () => {
    return new JsxResponse(
      (
        <this.layout path="/admin" title="Dashboard">
          <h1>Dashboard</h1>
        </this.layout>
      )
    )
  }
}

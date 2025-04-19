import { BaseAdmin, type BaseAdminServices } from '../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components } from '/domain/components'

export class AdminAutomations extends BaseAdmin {
  constructor(services: BaseAdminServices, components: Components) {
    super(services, components)
  }

  init = async () => {
    super.init('/admin/automations')
  }

  get = async () => {
    return new JsxResponse(
      (
        <this.layout path="/admin/automations" title="Automations | Admin">
          <h1>Automations</h1>
        </this.layout>
      )
    )
  }
}

import { BaseAdmin, type BaseAdminServices } from '../../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components } from '/domain/components'

export class AdminAutomationsHistory extends BaseAdmin {
  constructor(services: BaseAdminServices, components: Components) {
    super(services, components)
  }

  init = async () => {
    await super.init('/admin/automations/history')
  }

  get = async () => {
    const { H1 } = this._components
    return new JsxResponse(
      (
        <this.layout path="/admin/automations/history" title="Automations History">
          <H1>Automations History</H1>
        </this.layout>
      )
    )
  }
}

import { BaseAdmin, type BaseAdminServices } from '../base'
import { JsxResponse } from '../../Response/Jsx'
import type { Components } from '../../../components'

export class AdminAutomations extends BaseAdmin {
  constructor(services: BaseAdminServices, components: Components) {
    super(services, components)
  }

  init = async () => {
    await super.init('/admin/automations')
  }

  get = async () => {
    return new JsxResponse(
      (
        <this.layout path="/admin/automations" title="Automations">
          <h1>Automations</h1>
        </this.layout>
      )
    )
  }
}

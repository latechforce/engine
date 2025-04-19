import { BaseAdmin, type BaseAdminServices } from '../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components } from '/domain/components'

export class AdminIntegrations extends BaseAdmin {
  constructor(services: BaseAdminServices, components: Components) {
    super(services, components)
  }

  init = async () => {
    super.init('/admin/integrations')
  }

  get = async () => {
    return new JsxResponse(
      (
        <this.layout path="/admin/integrations" title="Integrations | Admin">
          <h1>Integrations</h1>
        </this.layout>
      )
    )
  }
}

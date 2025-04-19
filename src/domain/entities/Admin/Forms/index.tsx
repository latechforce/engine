import { BaseAdmin, type BaseAdminServices } from '../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components } from '/domain/components'

export class AdminForms extends BaseAdmin {
  constructor(services: BaseAdminServices, components: Components) {
    super(services, components)
  }

  init = async () => {
    super.init('/admin/forms')
  }

  get = async () => {
    return new JsxResponse(
      (
        <this.layout path="/admin/forms" title="Forms | Admin">
          <h1>Forms</h1>
        </this.layout>
      )
    )
  }
}

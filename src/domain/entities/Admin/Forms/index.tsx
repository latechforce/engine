import { BaseAdmin } from '../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components } from '/domain/components'
import type { Server } from '/domain/services'
import { Theme } from '/domain/services'

export type AdminServices = {
  server: Server
  theme: Theme
}

export class AdminForms extends BaseAdmin {
  constructor(services: AdminServices, components: Components) {
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

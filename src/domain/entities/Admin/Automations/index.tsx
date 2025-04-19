import { BaseAdmin } from '../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components } from '/domain/components'
import type { Server } from '/domain/services'
import { Theme } from '/domain/services'

export type AdminServices = {
  server: Server
  theme: Theme
}

export class AdminAutomations extends BaseAdmin {
  constructor(services: AdminServices, components: Components) {
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

import { BaseAdmin } from '../base'
import { JsxResponse } from '/domain/entities/Response/Jsx'
import type { Components } from '/domain/components'
import type { Server } from '/domain/services'
import { Theme } from '/domain/services'

export type AdminServices = {
  server: Server
  theme: Theme
}

export class AdminTables extends BaseAdmin {
  constructor(services: AdminServices, components: Components) {
    super(services, components)
  }

  init = async () => {
    super.init('/admin/tables')
  }

  get = async () => {
    return new JsxResponse(
      (
        <this.layout path="/admin/tables" title="Tables | Admin">
          <h1>Tables</h1>
        </this.layout>
      )
    )
  }
}

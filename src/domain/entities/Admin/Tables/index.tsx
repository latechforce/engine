import { BaseAdmin, type BaseAdminServices } from '../base'
import { JsxResponse } from '../../Response/Jsx'
import type { Components } from '../../../components'

export class AdminTables extends BaseAdmin {
  constructor(services: BaseAdminServices, components: Components) {
    super(services, components)
  }

  init = async () => {
    await super.init('/admin/tables')
  }

  get = async () => {
    return new JsxResponse(
      (
        <this.layout path="/admin/tables" title="Tables">
          <h1>Tables</h1>
        </this.layout>
      )
    )
  }
}

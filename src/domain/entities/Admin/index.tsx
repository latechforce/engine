import { JsxResponse } from '../Response/Jsx'
import type { Server } from '/domain/services'

export type AdminServices = {
  server: Server
}

export class Admin {
  constructor(private readonly _services: AdminServices) {}

  init = async () => {
    const { server } = this._services
    await server.get('/admin', this.get)
  }

  get = async () => {
    return new JsxResponse(
      (
        <div>
          <h1>Admin</h1>
        </div>
      )
    )
  }
}

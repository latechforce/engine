import type { InputConfig } from './Input'
import type { ConfigError } from '/domain/entities/Error/Config'
import type { Server } from '/domain/services/Server'
import type { Table } from '../Table'
import { JsxResponse } from '../Response/Jsx'
export interface FormConfig {
  name: string
  path: string
  title?: string
  description?: string
  table: string
  inputs: InputConfig[]
}

export interface FormServices {
  server: Server
}

export interface FormEntities {
  tables: Table[]
}

export class Form {
  constructor(
    private _config: FormConfig,
    private _services: FormServices,
    private _entities: FormEntities
  ) {}

  init = async () => {
    const { server } = this._services
    const { path, title, description } = this._config
    await server.get(`/forms/${path}`, async () => {
      return new JsxResponse(
        (
          <html lang="en">
            <head>
              <title>{title}</title>
            </head>
            <body>
              <h1>{title}</h1>
              <p>{description}</p>
            </body>
          </html>
        )
      )
    })
  }

  validateConfig = async (): Promise<ConfigError[]> => {
    return []
  }
}

import { Input, type InputConfig } from './Input'
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
  submitLabel?: string
}

export interface FormServices {
  server: Server
}

export interface FormEntities {
  tables: Table[]
}

export class Form {
  table: Table

  constructor(
    private _config: FormConfig,
    private _services: FormServices,
    entities: FormEntities
  ) {
    const { tables } = entities
    const table = tables.find((table) => table.name === _config.table)
    if (!table) throw new Error(`Table ${_config.table} not found`)
    this.table = table
  }

  init = async () => {
    const { server } = this._services
    const { path } = this._config
    await server.get(`/forms/${path}`, this.render)
  }

  validateConfig = async (): Promise<ConfigError[]> => {
    return []
  }

  render = async (): Promise<JsxResponse> => {
    const { name, title, description, inputs, submitLabel } = this._config
    const Inputs = await Promise.all(inputs.map((input) => new Input(input, this.table).render()))
    return new JsxResponse(
      (
        <html lang="en">
          <head>
            <title>{title ?? name}</title>
          </head>
          <body>
            {title ? <h1>{title}</h1> : null}
            {description ? <p>{description}</p> : null}
            <form action={`${this.table.path}`} method="POST">
              {Inputs}
              <button type="submit">{submitLabel ?? 'Submit'}</button>
            </form>
          </body>
        </html>
      )
    )
  }
}

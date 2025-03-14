import { Input, type InputComponents, type InputConfig } from './Input'
import type { ConfigError } from '/domain/entities/Error/Config'
import type { Server } from '/domain/services/Server'
import type { Table } from '../Table'
import { JsxResponse } from '../Response/Jsx'
import type { PageProps } from '../Page'

export interface FormProps extends React.PropsWithChildren {
  action: string
  title: string
  description?: string
  submitLabel?: string
}

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

export interface FormComponents extends InputComponents {
  Page: React.ComponentType<PageProps>
  Form: React.ComponentType<FormProps>
}

export class Form {
  table: Table

  constructor(
    private _config: FormConfig,
    private _services: FormServices,
    entities: FormEntities,
    private _components: FormComponents
  ) {
    const { tables } = entities
    const table = tables.find((table) => table.name === _config.table)
    if (!table) throw new Error(`Table ${_config.table} not found`)
    this.table = table
  }

  init = async () => {
    const { server } = this._services
    const { path } = this._config
    await server.get(`/form/${path}`, async () => new JsxResponse(this.render()))
  }

  validateConfig = async (): Promise<ConfigError[]> => {
    return []
  }

  render = (): React.ReactElement => {
    const { name, title = name, description, inputs, submitLabel } = this._config
    const { Form, Page } = this._components
    const Inputs = inputs.map((input) => {
      const Component = new Input(input, this.table, this._components).render
      return <Component key={input.field} />
    })
    return (
      <Page title={title} description={description}>
        <Form
          title={title}
          description={description}
          action={this.table.path}
          submitLabel={submitLabel ?? 'Submit'}
        >
          {Inputs}
        </Form>
      </Page>
    )
  }
}

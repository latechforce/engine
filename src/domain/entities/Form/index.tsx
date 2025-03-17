import { Input, type InputComponents, type InputConfig } from './Input'
import type { ConfigError } from '/domain/entities/Error/Config'
import type { Server } from '/domain/services/Server'
import type { Table } from '../Table'
import { JsxResponse } from '../Response/Jsx'
import type { IdGenerator } from '/domain/services/IdGenerator'
import type { Fetcher } from '/domain/services/Fetcher'
import type { PostRequest } from '../Request/Post'
import type { Client } from '/domain/services/Client'
import type { Page as PageComponent } from '/domain/components/Page'
import type { Form as FormComponent } from '/domain/components/Form'
import type { FormResponse as FormResponseComponent } from '/domain/components/Form/FormResponse'

export interface FormConfig {
  name: string
  path: string
  title?: string
  description?: string
  table: string
  inputs: InputConfig[]
  submitLabel?: string
  successMessage?: string
}

export interface FormServices {
  server: Server
  idGenerator: IdGenerator
  fetcher: Fetcher
  client: Client
}

export interface FormEntities {
  tables: Table[]
}

export interface FormComponents extends InputComponents {
  Page: PageComponent
  Form: FormComponent
  FormResponse: FormResponseComponent
}

export class Form {
  id: string
  table: Table
  path: string

  constructor(
    private _config: FormConfig,
    private _services: FormServices,
    entities: FormEntities,
    private _components: FormComponents
  ) {
    const { tables } = entities
    const { idGenerator } = this._services
    const table = tables.find((table) => table.name === _config.table)
    if (!table) throw new Error(`Table ${_config.table} not found`)
    this.table = table
    this.id = idGenerator.forComponent()
    this.path = `/form/${this._config.path}`
  }

  init = async () => {
    const { server } = this._services
    await server.get(this.path, this.get)
    await server.post(this.path, this.post)
  }

  validateConfig = async (): Promise<ConfigError[]> => {
    return []
  }

  post = async (request: PostRequest): Promise<JsxResponse> => {
    const { FormResponse } = this._components
    const { successMessage = 'Form submitted successfully!' } = this._config
    await this.table.insert(request.body)
    return new JsxResponse(<FormResponse id={this.id} message={successMessage} />)
  }

  get = async (): Promise<JsxResponse> => {
    const { client } = this._services
    const { name, title = name, description, inputs, submitLabel } = this._config
    const { Form, Page } = this._components
    const formClientProps = client.getHtmlAttributes({
      post: this.path,
      target: `#${this.id}-form-container`,
      action: 'replace',
    })
    return new JsxResponse(
      (
        <Page title={title} description={description}>
          <Form
            id={this.id}
            title={title}
            description={description}
            submitLabel={submitLabel ?? 'Submit'}
            formClientProps={formClientProps}
          >
            {inputs.map((input) => {
              const component = new Input(input, this.table, this._components)
              return <component.render key={input.field} />
            })}
          </Form>
        </Page>
      )
    )
  }
}

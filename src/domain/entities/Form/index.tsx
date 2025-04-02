import { Input, type InputComponents, type InputConfig } from './Input'
import type { ConfigError } from '/domain/entities/Error/Config'
import type { Server } from '/domain/services/Server'
import type { Table } from '../Table'
import { JsxResponse } from '../Response/Jsx'
import type { IdGenerator } from '/domain/services/IdGenerator'
import type { PostRequest } from '../Request/Post'
import type { Client, ClientHtmlAttributesOptions } from '/domain/services/Client'
import type { Page as PageComponent } from '/domain/components/Page'
import type { Form as FormComponent } from '/domain/components/Form'
import type { FormResponse as FormResponseComponent } from '/domain/components/Form/FormResponse'
import type { Logger } from '/domain/services/Logger'
import type { System } from '/domain/services/System'

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
  client: Client
  logger: Logger
  system: System
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
  inputs: Input[]
  timestamp: string

  constructor(
    private _config: FormConfig,
    private _services: FormServices,
    entities: FormEntities,
    private _components: FormComponents
  ) {
    const { tables } = entities
    const { idGenerator, system } = this._services
    const { inputs, path } = this._config
    const table = tables.find((table) => table.name === _config.table)
    if (!table) throw new Error(`Table ${_config.table} not found`)
    this.table = table
    this.id = idGenerator.forComponent()
    this.path = system.joinPath(`/form`, path)
    this.inputs = inputs.map((input) => new Input(input, this.table, this._components))
    this.timestamp = String(+Date.now())
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
    const { error } = await this.table.insert(request.body)
    if (error) {
      this._services.logger.error(JSON.stringify(error))
      return new JsxResponse(<FormResponse id={this.id} message={`Error 500`} />)
    }
    return new JsxResponse(<FormResponse id={this.id} message={successMessage} />)
  }

  get = async (): Promise<JsxResponse> => {
    const { client } = this._services
    const { name, title = name, description, submitLabel } = this._config
    const { Form, Page } = this._components
    const htmlAttributes: ClientHtmlAttributesOptions = {
      post: this.path,
      target: `#${this.id}-form-container`,
      action: 'replace',
    }
    if (this.inputs.some((input) => input.field.config.type === 'MultipleAttachment')) {
      htmlAttributes.fileUpload = true
    }
    const formClientProps = client.getHtmlAttributes(htmlAttributes)
    return new JsxResponse(
      (
        <Page title={title} description={description} timestamp={this.timestamp}>
          <Form
            id={this.id}
            title={title}
            description={description}
            submitLabel={submitLabel ?? 'Submit'}
            formClientProps={formClientProps}
          >
            {this.inputs.map((input) => {
              return <input.render key={input.field.name} />
            })}
          </Form>
        </Page>
      )
    )
  }
}

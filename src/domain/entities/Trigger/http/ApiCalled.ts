import type { Server, ServerMethodOptionsAuth } from '/domain/services/Server'
import { JsonResponse } from '/domain/entities/Response/Json'
import type { PostRequest } from '/domain/entities/Request/Post'
import type { JSONSchema, JSONSchemaProperties } from '/domain/services/SchemaValidator'
import { AutomationContext } from '../../Automation/Context'
import type { BaseTrigger, BaseTriggerConfig } from '../base'
import {
  Template,
  type TemplateObject,
  type TemplateObjectCompiled,
} from '/domain/services/Template'
import type { TemplateCompiler } from '/domain/services/TemplateCompiler'
import type { Monitor } from '/domain/services/Monitor'

export interface ApiCalledHttpTriggerConfig extends BaseTriggerConfig {
  path: string
  input?: JSONSchema
  output?: TemplateObject
  auth?: ServerMethodOptionsAuth
  summary?: string
  description?: string
}

export interface ApiCalledHttpTriggerServices {
  server: Server
  templateCompiler: TemplateCompiler
  monitor: Monitor
}

export class ApiCalledHttpTrigger implements BaseTrigger {
  private _output?: TemplateObjectCompiled

  constructor(
    private _config: ApiCalledHttpTriggerConfig,
    private _services: ApiCalledHttpTriggerServices
  ) {
    const { output } = this._config
    const { templateCompiler } = this._services
    this._output = output ? templateCompiler.compileObject(output) : undefined
  }

  get path() {
    const { path } = this._config
    return `/api/automation/${path}`
  }

  init = async (run: (triggerData: object) => Promise<AutomationContext>) => {
    const { server } = this._services
    const outputProperties = this._getOutputProperties()
    await server.post(this.path, (request: PostRequest) => this.post(request, run), {
      auth: this._config.auth,
      body: this._config.input,
      response: {
        type: 'object',
        properties: outputProperties,
        required: Object.keys(outputProperties),
        additionalProperties: false,
      },
      detail: {
        summary: this._config.summary,
        description: this._config.description,
        tags: ['Automation'],
      },
    })
  }

  post = async (request: PostRequest, run: (data: object) => Promise<AutomationContext>) => {
    try {
      const { input } = this._config
      const { body, path, baseUrl, headers, query, params } = request
      let context: AutomationContext
      if (!input) {
        context = await run({ path, baseUrl, headers, query, params })
      } else {
        context = await run({ body, path, baseUrl, headers, query, params })
      }
      if (context.status === 'failed') {
        return new JsonResponse({ error: context.error }, 400)
      }
      if (this._output) {
        const response = Template.fillObject(this._output, context.data)
        return new JsonResponse(response)
      }
      return new JsonResponse({ success: true })
    } catch (error) {
      if (error instanceof Error) {
        return new JsonResponse({ error: error.message }, 400)
      }
      return new JsonResponse({ error: 'Unknown error' }, 500)
    }
  }

  private _getOutputProperties = (): JSONSchemaProperties => {
    const { output } = this._config
    if (!output) {
      return {
        success: { type: 'boolean' },
      }
    }
    return Object.keys(output).reduce((res: JSONSchemaProperties, key) => {
      const value = output ? output[key] : undefined
      if (!value || typeof value === 'string') {
        res[key] = { type: 'string' }
      } else if ('number' in value) {
        res[key] = { type: 'number' }
      } else if ('boolean' in value) {
        res[key] = { type: 'boolean' }
      } else if ('json' in value) {
        res[key] = { type: 'object' }
      }
      return res
    }, {})
  }
}

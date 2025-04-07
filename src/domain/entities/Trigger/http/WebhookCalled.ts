import type { Queue } from '/domain/services/Queue'
import type { Server, ServerMethodOptionsAuth } from '/domain/services/Server'
import { JsonResponse } from '/domain/entities/Response/Json'
import type { PostRequest } from '/domain/entities/Request/Post'
import type { BaseTrigger, BaseTriggerConfig } from '../base'
import type { AutomationContext } from '../../Automation/Context'
import type { System } from '/domain/services/System'

export interface WebhookCalledHttpTriggerConfig extends BaseTriggerConfig {
  automation: string
  path: string
  auth?: ServerMethodOptionsAuth
  summary?: string
  description?: string
}

export interface WebhookCalledHttpTriggerServices {
  server: Server
  queue: Queue
  system: System
}

export class WebhookCalledHttpTrigger implements BaseTrigger {
  constructor(
    private _config: WebhookCalledHttpTriggerConfig,
    private _services: WebhookCalledHttpTriggerServices
  ) {}

  get path() {
    const { path } = this._config
    const { system } = this._services
    return system.joinPath(`/api/webhook`, path)
  }

  init = async (run: (triggerData: object) => Promise<AutomationContext>) => {
    const { automation } = this._config
    const { server, queue } = this._services
    await server.post(this.path, this.post, {
      auth: this._config.auth,
      response: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
        },
        required: ['success'],
        additionalProperties: false,
      },
      detail: {
        summary: this._config.summary,
        description: this._config.description,
        tags: ['Webhook'],
      },
    })
    queue.job(automation, run)
  }

  validateConfig = async () => {
    return []
  }

  post = async (request: PostRequest) => {
    const { queue } = this._services
    const { automation } = this._config
    const result = {
      path: request.path,
      baseUrl: request.baseUrl,
      body: request.body,
      headers: request.headers,
      query: request.query,
      params: request.params,
    }
    await queue.add(automation, result)
    return new JsonResponse({ success: true })
  }
}

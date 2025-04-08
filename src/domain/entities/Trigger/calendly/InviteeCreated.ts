import type { Queue } from '/domain/services/Queue'
import type { BaseTrigger, BaseTriggerConfig } from '../base'
import type { AutomationContext } from '../../Automation/Context'
import type { Calendly } from '/domain/integrations/Calendly'
import type { Server } from '/domain/services/Server'
import { ConfigError } from '../../Error/Config'
import type { System } from '/domain/services/System'
import type { PostRequest } from '../../Request'
import { JsonResponse } from '../../Response/Json'

export interface InviteeCreatedCalendlyTriggerConfig extends BaseTriggerConfig {
  automation: string
}

export interface InviteeCreatedCalendlyTriggerServices {
  queue: Queue
  server: Server
  system: System
}

export interface InviteeCreatedCalendlyTriggerIntegrations {
  calendly: Calendly
}

export class InviteeCreatedCalendlyTrigger implements BaseTrigger {
  constructor(
    private _config: InviteeCreatedCalendlyTriggerConfig,
    private _services: InviteeCreatedCalendlyTriggerServices,
    private _integrations: InviteeCreatedCalendlyTriggerIntegrations
  ) {}

  init = async (run: (triggerData: object) => Promise<AutomationContext>) => {
    const { queue, server, system } = this._services
    const { automation } = this._config
    const { calendly } = this._integrations
    const triggerPath =
      '/' + system.joinPath('api', 'trigger', 'calendly', 'invitee-created', automation)
    await server.post(triggerPath, this.onTriggerCalled)
    const triggerUrl = system.joinPath(server.baseUrl, triggerPath)
    const user = await calendly.currentUser()
    const listWebhookResponse = await calendly.listWebhookSubscriptions({
      organization: user.current_organization,
      scope: 'user',
    })
    const webhookExist = listWebhookResponse.collection.find(
      (webhook) => webhook.callback_url === triggerUrl
    )
    if (!webhookExist) {
      await calendly.createWebhookSubscription({
        url: triggerUrl,
        events: ['invitee.created'],
        organization: user.current_organization,
        scope: 'user',
      })
    }
    queue.job(automation, run)
  }

  validateConfig = async () => {
    const { calendly } = this._integrations
    const response = await calendly.checkConfiguration()
    if (response?.error) {
      return [
        new ConfigError({
          entity: 'Trigger',
          name: 'InviteeCreatedCalendlyTrigger',
          message: response.error.message || 'Unknown error',
        }),
      ]
    }
    return []
  }

  onTriggerCalled = async (request: PostRequest) => {
    const { queue } = this._services
    const { automation } = this._config
    await queue.add(automation, request.getBodyAsObject())
    return new JsonResponse({ success: true })
  }
}

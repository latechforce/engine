import type { Queue } from '/domain/services/Queue'
import { BaseTrigger, type BaseTriggerIntegrationConfig } from '../../base'
import type { AutomationContext } from '../../../Automation/Context'
import type { Calendly } from '/domain/integrations/Calendly'
import type { Server } from '/domain/services/Server'
import type { System } from '/domain/services/System'
import type { PostRequest } from '../../../Request'
import { JsonResponse } from '../../../Response/Json'

export type InviteeCreatedCalendlyTriggerConfig = BaseTriggerIntegrationConfig

export interface InviteeCreatedCalendlyTriggerServices {
  queue: Queue
  server: Server
  system: System
}

export interface InviteeCreatedCalendlyTriggerIntegrations {
  calendly: Calendly
}

export class InviteeCreatedCalendlyTrigger extends BaseTrigger<InviteeCreatedCalendlyTriggerConfig> {
  constructor(
    config: InviteeCreatedCalendlyTriggerConfig,
    private _services: InviteeCreatedCalendlyTriggerServices,
    private _integrations: InviteeCreatedCalendlyTriggerIntegrations
  ) {
    super(config)
  }

  validate = async () => {
    const { calendly } = this._integrations
    const { account } = this._config
    return calendly.validate({ account, entity: 'Trigger', name: 'InviteeCreatedCalendlyTrigger' })
  }

  init = async (run: (triggerData: object) => Promise<AutomationContext>) => {
    const { queue, server, system } = this._services
    const { automation, account } = this._config
    const { calendly } = this._integrations
    const triggerPath =
      '/' + system.joinPath('api', 'trigger', 'calendly', 'invitee-created', automation)
    await server.post(triggerPath, this.onTriggerCalled)
    const triggerUrl = system.joinPath(server.baseUrl, triggerPath)
    const user = await calendly.currentUser(account)
    const listWebhookResponse = await calendly.listWebhookSubscriptions(account, {
      organization: user.current_organization,
      scope: 'user',
    })
    const webhookExist = listWebhookResponse.collection.find(
      (webhook) => webhook.callback_url === triggerUrl
    )
    if (!webhookExist) {
      await calendly.createWebhookSubscription(account, {
        url: triggerUrl,
        events: ['invitee.created'],
        organization: user.current_organization,
        scope: 'user',
      })
    }
    queue.job(automation, run)
  }

  onTriggerCalled = async (request: PostRequest) => {
    const { queue } = this._services
    const { automation } = this._config
    await queue.add(automation, request.getBodyAsObject())
    return new JsonResponse({ success: true })
  }
}

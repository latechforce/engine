import type { Queue } from '/domain/services/Queue'
import { BaseTrigger, type BaseTriggerIntegrationConfig } from '../../base'
import type { AutomationContext } from '../../../Automation/Context'
import type { Zoom } from '/domain/integrations/Zoom'
import type { PostRequest } from '../../../Request'
import type { Server } from '/domain/services/Server'
import type { System } from '/domain/services/System'
import { JsonResponse } from '../../../Response/Json'

export type WebinarParticipantJoinedTriggerConfig = BaseTriggerIntegrationConfig

export interface WebinarParticipantJoinedTriggerServices {
  queue: Queue
  server: Server
  system: System
}

export interface WebinarParticipantJoinedTriggerIntegrations {
  zoom: Zoom
}

export class WebinarParticipantJoinedTrigger extends BaseTrigger<WebinarParticipantJoinedTriggerConfig> {
  constructor(
    config: WebinarParticipantJoinedTriggerConfig,
    private _services: WebinarParticipantJoinedTriggerServices,
    private _integrations: WebinarParticipantJoinedTriggerIntegrations
  ) {
    super(config)
  }

  init = async (run: (triggerData: object) => Promise<AutomationContext>) => {
    const { queue, server, system } = this._services
    const { automation, account } = this._config
    const { zoom } = this._integrations

    const triggerPath =
      '/' + system.joinPath('api', 'trigger', 'zoom', 'webinar-participant-joined', automation)
    await server.post(triggerPath, this.onTriggerCalled)
    const triggerUrl = system.joinPath(server.baseUrl, triggerPath)

    // Register webhook with Zoom for webinar.participant_joined event
    // Note: Implementation depends on the Zoom API client implementation
    try {
      await zoom.registerWebhook({
        account,
        event: 'webinar.participant_joined',
        url: triggerUrl,
      })
    } catch (error) {
      console.error('Failed to register Zoom webhook:', error)
      throw error
    }

    queue.job(automation, run)
  }

  validate = async () => {
    const { zoom } = this._integrations
    const { account } = this._config
    return zoom.validate({ account, entity: 'Trigger', name: 'WebinarParticipantJoinedTrigger' })
  }

  onTriggerCalled = async (request: PostRequest) => {
    const { queue } = this._services
    const { automation } = this._config

    // Extract the request body which contains the webinar participant joined data
    const webhookData = request.getBodyAsObject()

    // Validate that this is the correct event type
    if (webhookData.event !== 'webinar.participant_joined') {
      return new JsonResponse({ success: false, error: 'Invalid event type' }, 400)
    }

    // Add the webhook data to the queue for processing
    await queue.add(automation, webhookData)

    return new JsonResponse({ success: true })
  }
}

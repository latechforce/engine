import type { Queue } from '/domain/services/Queue'
import type { BaseTrigger, BaseTriggerConfig } from '../base'
import type { AutomationContext } from '../../Automation/Context'
import type { YouCanBookMe } from '/domain/integrations/YouCanBookMe'
import type { PostRequest } from '../../Request'
import type { Server } from '/domain/services/Server'
import type { System } from '/domain/services/System'
import { JsonResponse } from '../../Response/Json'
import { ConfigError } from '../../Error/Config'
import type { YouCanBookMeWebhookAction } from '/domain/integrations/YouCanBookMe/YouCanBookMeTypes'

export interface BookingCreatedTriggerConfig extends BaseTriggerConfig {
  automation: string
}

export interface BookingCreatedTriggerServices {
  queue: Queue
  server: Server
  system: System
}

export interface BookingCreatedTriggerIntegrations {
  youCanBookMe: YouCanBookMe
}

export class BookingCreatedTrigger implements BaseTrigger {
  constructor(
    private _config: BookingCreatedTriggerConfig,
    private _services: BookingCreatedTriggerServices,
    private _integrations: BookingCreatedTriggerIntegrations
  ) {}

  init = async (run: (triggerData: object) => Promise<AutomationContext>) => {
    const { queue, server, system } = this._services
    const { automation } = this._config
    const { youCanBookMe } = this._integrations

    const triggerPath =
      '/' + system.joinPath('api', 'trigger', 'you-can-book-me', 'invitee-created', automation)
    await server.post(triggerPath, this.onTriggerCalled)
    const triggerUrl = system.joinPath(server.baseUrl, triggerPath)
    const currentProfile = await youCanBookMe.currentProfile()

    const youCanBookMeWebhookActions = currentProfile.actions.filter(
      (action) => action.type === 'WEBHOOK'
    )

    if (youCanBookMeWebhookActions.length === 0) {
      const youCanBookMeWebhookAction: YouCanBookMeWebhookAction = {
        type: 'WEBHOOK',
        status: 'TEMPLATE',
        anchor: 'BOOKING_CREATED',
        offsetMinutes: 0,
        title: `${automation.toUpperCase()} Booking created API call`,
        to: triggerUrl,
        subject: 'POST',
        body: '{ "startsAt": "{START-LOCAL-DATE}", "endsAt": "{END-LOCAL-TIME}", "timeZone": "{TIMEZONE}", "firstName": "{FNAME}", "email": "{EMAIL}" }',
      }
      await youCanBookMe.updateProfile(currentProfile.id, {
        actions: [...currentProfile.actions, youCanBookMeWebhookAction],
      })
    }

    queue.job(automation, run)
  }

  validateConfig = async () => {
    const { youCanBookMe } = this._integrations
    const response = await youCanBookMe.checkConfiguration()
    if (response?.error) {
      return [
        new ConfigError({
          entity: 'Trigger',
          name: 'BookingCreatedTrigger',
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

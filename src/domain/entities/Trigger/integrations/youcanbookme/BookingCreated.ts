import type { Queue } from '/domain/services/Queue'
import { BaseTrigger, type BaseTriggerIntegrationConfig } from '../../base'
import type { AutomationContext } from '../../../Automation/Context'
import type { YouCanBookMe } from '/domain/integrations/YouCanBookMe'
import type { PostRequest } from '../../../Request'
import type { Server } from '/domain/services/Server'
import type { System } from '/domain/services/System'
import { JsonResponse } from '../../../Response/Json'
import type { YouCanBookMeWebhookAction } from '/domain/integrations/YouCanBookMe/YouCanBookMeTypes'

export type BookingCreatedTriggerConfig = BaseTriggerIntegrationConfig

export interface BookingCreatedTriggerServices {
  queue: Queue
  server: Server
  system: System
}

export interface BookingCreatedTriggerIntegrations {
  youcanbookme: YouCanBookMe
}

export class BookingCreatedTrigger extends BaseTrigger<BookingCreatedTriggerConfig> {
  constructor(
    config: BookingCreatedTriggerConfig,
    private _services: BookingCreatedTriggerServices,
    private _integrations: BookingCreatedTriggerIntegrations
  ) {
    super(config)
  }

  init = async (run: (triggerData: object) => Promise<AutomationContext>) => {
    const { queue, server, system } = this._services
    const { automation, account } = this._config
    const { youcanbookme } = this._integrations

    const triggerPath =
      '/' + system.joinPath('api', 'trigger', 'you-can-book-me', 'invitee-created', automation)
    await server.post(triggerPath, this.onTriggerCalled)
    const triggerUrl = system.joinPath(server.baseUrl, triggerPath)
    const { data: currentProfile } = await youcanbookme.currentProfile(account)

    if (!currentProfile) {
      throw new Error('Current profile not found')
    }

    const youCanBookMeWebhookActions = currentProfile.actions?.filter(
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
      await youcanbookme.updateProfile(account, currentProfile.id, {
        actions: [...currentProfile.actions, youCanBookMeWebhookAction],
      })
    }

    queue.job(automation, run)
  }

  validate = async () => {
    const { youcanbookme } = this._integrations
    const { account } = this._config
    return youcanbookme.validate({ account, entity: 'Trigger', name: 'BookingCreatedTrigger' })
  }

  onTriggerCalled = async (request: PostRequest) => {
    const { queue } = this._services
    const { automation } = this._config
    await queue.add(automation, request.getBodyAsObject())
    return new JsonResponse({ success: true })
  }
}

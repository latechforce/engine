import { YouCanBookMeActionIntegration } from '@/action/infrastructure/integration/youcanbookme'
import type { BaseIntegration } from '../base'
import type { IntegrationTrigger } from '@/trigger/domain/entity/integration-trigger.entity'
import type { YouCanBookMeWebhookAction } from './types'

export class YouCanBookMeTriggerIntegration implements BaseIntegration {
  constructor(
    protected readonly baseUrl: string,
    private readonly username: string,
    private readonly password: string
  ) {}

  async setupTrigger(trigger: IntegrationTrigger) {
    const { schema } = trigger
    const actions = new YouCanBookMeActionIntegration(this.baseUrl, this.username, this.password)
    switch (schema.event) {
      case 'booking-notifications':
        const currentProfile = await actions.currentProfile()

        const youCanBookMeWebhookActions = currentProfile.actions?.filter(
          (action) => action.type === 'WEBHOOK'
        )

        if (youCanBookMeWebhookActions.length === 0) {
          const youCanBookMeWebhookAction: YouCanBookMeWebhookAction = {
            type: 'WEBHOOK',
            status: 'TEMPLATE',
            anchor: 'BOOKING_CREATED',
            offsetMinutes: 0,
            title: `${trigger.automationName} Booking created API call`,
            to: trigger.schema.path,
            subject: 'POST',
            body: '{ "startsAt": "{START-LOCAL-DATE}", "endsAt": "{END-LOCAL-TIME}", "timeZone": "{TIMEZONE}", "firstName": "{FNAME}", "email": "{EMAIL}" }',
          }
          await actions.updateProfile(currentProfile.id, {
            actions: [...currentProfile.actions, youCanBookMeWebhookAction],
          })
        }
        break
      default:
        throw new Error(`Unsupported trigger type: ${schema.event}`)
    }
  }
}

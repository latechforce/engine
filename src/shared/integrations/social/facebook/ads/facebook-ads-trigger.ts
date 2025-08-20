import type { Token } from '../../../../../features/connection/domain/value-object/token.value-object'
import type { FacebookAdsTriggerSchema } from './facebook-ads-trigger.schema'
import { FacebookIntegration } from '../facebook.integration'

export class FacebookAdsTriggerIntegration {
  constructor(
    private readonly schema: FacebookAdsTriggerSchema,
    private readonly automationId: number
  ) {}

  async setupTrigger(token: Token, url: string) {
    const client = new FacebookIntegration(token.access_token)
    switch (this.schema.event) {
      case 'new-lead': {
        const { pageId, appId } = this.schema.params
        // Check existing app subscriptions
        const appSubs = await client.listAppSubscriptions(token.id.toString())
        const appSubscriptionsAlreadyExists = appSubs.data.some((s) => s.callback_url === url)
        if (!appSubscriptionsAlreadyExists) {
          await client.createAppSubscription({
            appId,
            callback_url: url,
            object: 'page',
            fields: ['leadgen'],
          })
        }
        // Check existing page subscriptions
        const subs = await client.listPageSubscriptions(pageId)
        const pageSubscriptionsAlreadyExists = subs.data.some((s) => s.link === url)
        if (!pageSubscriptionsAlreadyExists) {
          await client.subscribePageToLeadGen(pageId)
        }
        break
      }
      default: {
        const _exhaustiveCheck: never = this.schema.event
        throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
      }
    }
  }
}

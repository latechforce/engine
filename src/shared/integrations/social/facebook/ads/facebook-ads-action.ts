import type { Token } from '../../../../../features/connection/domain/value-object/token.value-object'
import type { FacebookActionSchema } from './facebook-ads-action.schema'
import { FacebookIntegration } from '../facebook.integration'

export class FacebookAdsActionIntegration {
  constructor(private readonly schema: FacebookActionSchema) {}

  async runAction(token: Token): Promise<Record<string, unknown>> {
    const client = new FacebookIntegration(token.access_token)
    switch (this.schema.action) {
      case 'list-app-subscriptions': {
        const { appId } = this.schema.params
        return client.listAppSubscriptions(appId)
      }
      default: {
        throw new Error('Unhandled Facebook action')
      }
    }
  }
}

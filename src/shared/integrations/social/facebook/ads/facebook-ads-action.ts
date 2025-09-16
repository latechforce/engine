import type { Token } from '../../../../../features/connection/domain/value-object/token.value-object'
import type { FacebookActionSchema } from './facebook-ads-action.schema'
import { FacebookIntegration } from '../facebook.integration'

export class FacebookAdsActionIntegration {
  constructor(private readonly schema: FacebookActionSchema) {}

  async runAction(token: Token): Promise<Record<string, unknown>> {
    switch (this.schema.action) {
      case 'list-app-subscriptions': {
        const { appId, appSecret } = this.schema.params
        const client = new FacebookIntegration(token.access_token, appSecret)
        return client.listAppSubscriptions(appId)
      }
      case 'get-leadgen': {
        const { leadgenId } = this.schema.params
        const client = new FacebookIntegration(token.access_token)
        return client.getLeadgenData(leadgenId)
      }
      default: {
        throw new Error('Unhandled Facebook action')
      }
    }
  }
}

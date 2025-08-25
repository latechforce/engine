import type { Token } from '../../../../../features/connection/domain/value-object/token.value-object'
import type { FacebookAdsTriggerSchema } from './facebook-ads-trigger.schema'
import { FacebookIntegration } from '../facebook.integration'
import { randomBytes } from 'crypto'

export class FacebookAdsTriggerIntegration {
  constructor(
    private readonly schema: FacebookAdsTriggerSchema,
    private readonly automationId: number
  ) {}

  /**
   * Generate a secure verify token for webhook validation
   */
  private generateVerifyToken(): string {
    return randomBytes(32).toString('hex')
  }

  /**
   * Normalize URL for comparison (Facebook may add trailing slashes or change protocol)
   */
  private normalizeUrl(url: string): string {
    try {
      const urlObj = new URL(url)
      // Remove trailing slash and ensure https
      return urlObj.href.replace(/\/$/, '').replace(/^http:/, 'https:')
    } catch {
      return url
    }
  }

  async setupTrigger(token: Token, url: string) {
    const client = new FacebookIntegration(token.access_token)

    switch (this.schema.event) {
      case 'new-lead': {
        const { pageId, appId, verifyToken } = this.schema.params

        try {
          // Generate verify token if not provided
          const actualVerifyToken = verifyToken || this.generateVerifyToken()

          // Normalize the webhook URL for comparison
          const normalizedUrl = this.normalizeUrl(url)

          // Step 1: Check and setup app-level webhook subscription
          let appSubscriptionExists = false

          try {
            const appSubs = await client.listAppSubscriptions(appId)

            // Check if webhook is already registered for 'page' object with 'leadgen' field
            appSubscriptionExists = appSubs.data.some(
              (sub) =>
                sub.object === 'page' &&
                sub.fields.includes('leadgen') &&
                this.normalizeUrl(sub.callback_url) === normalizedUrl
            )
          } catch (error) {
            // If we can't list subscriptions, assume it doesn't exist
            console.warn(`Failed to list app subscriptions: ${error}`)
            appSubscriptionExists = false
          }

          if (!appSubscriptionExists) {
            // Create app subscription for page leadgen events
            await client.createAppSubscription({
              appId,
              callback_url: url,
              object: 'page',
              fields: ['leadgen'],
              verify_token: actualVerifyToken,
            })

            // Store verify token for later webhook verification
            // This should be stored in your database associated with this trigger
            // For now, we'll log it (in production, save this securely)
            console.info(
              `Facebook webhook verify token for automation ${this.automationId}: ${actualVerifyToken}`
            )
          }

          // Step 2: Subscribe the specific page to leadgen events
          let pageSubscriptionExists = false

          try {
            // Check if page is already subscribed to leadgen
            pageSubscriptionExists = await client.isPageSubscribedToLeadGen(pageId)
          } catch (error) {
            console.warn(`Failed to check page subscription: ${error}`)
            pageSubscriptionExists = false
          }

          if (!pageSubscriptionExists) {
            // Subscribe the page to leadgen events
            await client.subscribePageToLeadGen(pageId)
          }

          // Success - both app and page are now subscribed
          return {
            success: true,
            verifyToken: actualVerifyToken,
            message: 'Facebook Lead Ads webhook successfully configured',
          }
        } catch (error) {
          // Proper error handling with context
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          throw new Error(
            `Failed to setup Facebook Lead Ads webhook: ${errorMessage}. ` +
              `Please ensure you have the required permissions (leads_retrieval, pages_manage_ads) ` +
              `and that your app is approved for Lead Ads access.`
          )
        }

        break
      }

      default: {
        const _exhaustiveCheck: never = this.schema.event
        throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
      }
    }
  }

  /**
   * Handle webhook verification from Facebook
   * This should be called when receiving a GET request to the webhook URL
   */
  async verifyWebhook(
    params: {
      'hub.mode': string
      'hub.challenge': string
      'hub.verify_token': string
    },
    expectedVerifyToken: string
  ): Promise<string | null> {
    // Facebook sends these params for webhook verification
    if (params['hub.mode'] === 'subscribe' && params['hub.verify_token'] === expectedVerifyToken) {
      // Return the challenge to confirm the webhook
      return params['hub.challenge']
    }

    // Verification failed
    return null
  }
}

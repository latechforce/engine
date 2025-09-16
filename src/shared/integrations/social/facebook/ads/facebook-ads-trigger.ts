import type { Token } from '../../../../../features/connection/domain/value-object/token.value-object'
import type { FacebookAdsTriggerSchema } from './facebook-ads-trigger.schema'
import { FacebookIntegration } from '../facebook.integration'

export class FacebookAdsTriggerIntegration {
  constructor(private readonly schema: FacebookAdsTriggerSchema) {}

  async setupTrigger(token: Token, url: string) {
    const client = new FacebookIntegration(token.access_token)

    switch (this.schema.event) {
      case 'new-lead': {
        const { pageId, appId, appSecret, verifyToken } = this.schema.params

        try {
          // Initialize client with app secret for app-level operations
          const clientWithSecret = new FacebookIntegration(token.access_token, appSecret)

          // Step 1: Get all pages the user manages
          const pagesResponse = await client.getAccounts()
          const pages = pagesResponse.data

          // Find the specific page and get its access token
          const targetPage = pages.find((page) => page.id === pageId)
          if (!targetPage || !targetPage.access_token) {
            throw new Error(`Page ${pageId} not found or no access token available`)
          }

          // Step 2: Check existing app subscriptions to avoid duplicates
          const existingAppSubs = await clientWithSecret.listAppSubscriptions(appId)

          // Remove duplicate webhooks - keep only the first occurrence of each unique webhook
          const webhookMap = new Map<string, (typeof existingAppSubs.data)[0]>()
          const duplicatesToDelete: string[] = []

          for (const element of existingAppSubs.data) {
            if (element.callback_url) {
              if (webhookMap.has(element.callback_url)) {
                // This is a duplicate, mark it for deletion (Facebook doesn't support deletion)
                duplicatesToDelete.push(element.callback_url)
              } else {
                // First occurrence, keep it
                webhookMap.set(element.callback_url, element)
              }
            }
          }

          // Check if current webhook already exists (after deduplication)
          const alreadyExists =
            webhookMap.has(url) ||
            Array.from(webhookMap.keys()).some(
              (webhook) => url.includes(webhook) || webhook.includes(url)
            )

          if (!alreadyExists) {
            // Create app subscription for page leadgen events
            await clientWithSecret.createAppSubscription({
              appId,
              callback_url: url,
              object: 'page',
              fields: ['leadgen'],
              verify_token: verifyToken,
            })
          }

          // Step 3: Check existing page subscriptions to avoid duplicates
          const existingPageSubs = await client.listPageSubscriptions(pageId)

          // Remove duplicate subscriptions - keep only leadgen subscriptions
          const leadgenSubscriptions = existingPageSubs.data.filter((sub) =>
            sub.subscribed_fields?.includes('leadgen')
          )

          // Check if leadgen subscription already exists
          const pageAlreadySubscribed = leadgenSubscriptions.length > 0

          if (!pageAlreadySubscribed) {
            // Step 4: Subscribe the page to leadgen webhook events using page token
            await client.subscribePageToWebhook(pageId, targetPage.access_token)
          }
          break
        } catch (error) {
          // Proper error handling with context
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          throw new Error(
            `Failed to setup Facebook Lead Ads webhook: ${errorMessage}. ` +
              `Please ensure you have the required permissions (leads_retrieval, pages_manage_ads) ` +
              `and access to the specified page.`
          )
        }
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

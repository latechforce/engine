import type {
  ListWebhooksResponse,
  CreateWebhookResponse,
  ListWebhookPayloadsResponse,
} from '../../src/integrations/airtable/airtable.types'

export const listWebhooksResponse: ListWebhooksResponse = {
  webhooks: [
    {
      areNotificationsEnabled: true,
      cursorForNextPayload: 1,
      expirationTime: '2023-01-20T00:00:00.000Z',
      id: 'ach00000000000000',
      isHookEnabled: true,
      lastNotificationResult: null,
      lastSuccessfulNotificationTime: null,
      notificationUrl: null,
      specification: {
        options: {
          filters: {
            dataTypes: ['tableData'],
            recordChangeScope: 'all',
          },
        },
      },
    },
  ],
}

export const listWebhookPayloadsResponse: ListWebhookPayloadsResponse = {
  cursor: 1,
  mightHaveMore: false,
  payloads: [
    {
      actionMetadata: {
        source: 'airtable',
        sourceMetadata: {
          user: {
            email: 'test@test.com',
            id: '123',
            permissionLevel: 'create',
          },
        },
      },
      baseTransactionNumber: 1,
      payloadFormat: 'json',
      timestamp: '2023-01-20T00:00:00.000Z',
    },
  ],
}

export const createWebhookResponse: CreateWebhookResponse = {
  expirationTime: '2023-01-20T00:00:00.000Z',
  id: 'ach00000000000000',
  macSecretBase64: 'someBase64MacSecret',
}

export type ListWebhooksResponse = {
  webhooks: {
    areNotificationsEnabled: boolean
    cursorForNextPayload: number
    expirationTime: string // ISO date string
    id: string
    isHookEnabled: boolean
    lastNotificationResult: null | unknown
    lastSuccessfulNotificationTime: null | string
    notificationUrl: null | string
    specification: {
      options: {
        filters: {
          dataTypes: string[]
          recordChangeScope: string
        }
      }
    }
  }[]
}

export type CreateWebhookResponse = {
  expirationTime: string
  id: string
  macSecretBase64: string
}

export type WebhookSpecification = {
  options: {
    filters: {
      dataTypes: ('tableData' | 'tableFields' | 'tableMetadata')[]
      recordChangeScope?: string
      changeTypes?: ('add' | 'remove' | 'update')[]
      fromSources?: (
        | 'client'
        | 'publicApi'
        | 'formSubmission'
        | 'formPageSubmission'
        | 'automation'
        | 'system'
        | 'sync'
        | 'anonymousUser'
        | 'unknown'
      )[]
      sourceOptions?: {
        formPageSubmission?: {
          pageId?: string
        }
        formSubmission?: {
          viewId?: string
        }
      }
      watchDataInFieldIds?: string[]
      watchSchemasOfFieldIds?: string[]
    }
    includes?: {
      includeCellValuesInFieldIds: (string | 'all')[]
      includePreviousCellValues?: boolean
      includePreviousFieldDefinitions?: boolean
    }
  }
}

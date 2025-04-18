export interface JotformError {
  message: string
  code?: number
  status?: string
}

export type JotformWebhook = {
  url: string
}

export type JotformWebhookResponse = {
  responseCode: number
  message: string
  content: Record<string, string>
  'limit-left': number
}

export type JotformWebhookParams = {
  formId: string
  webhookUrl: string
}

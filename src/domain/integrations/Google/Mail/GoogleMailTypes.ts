export interface GoogleMailEmailOptions {
  from?: string
  to: string
  cc?: string
  bcc?: string
  subject?: string
  text?: string
  html?: string
}

export interface GoogleMailEmailResponse {
  messageId: string
  accepted: string[]
  rejected: string[]
  response: string
  envelope: { from: string; to: string[] }
}

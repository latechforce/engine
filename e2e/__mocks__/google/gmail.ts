import type { SendEmailResponse } from '../../../src/integrations/google/gmail/google-gmail.types'

export const sendEmailResponse: SendEmailResponse = {
  id: '123',
  threadId: '123',
  labelIds: ['123'],
  snippet: 'Test',
  historyId: '123',
  internalDate: '123',
  payload: {
    object: {
      partId: '123',
      mimeType: 'text/plain',
      filename: 'test.txt',
      headers: [{ name: 'Subject', value: 'Test' }],
    },
  },
  sizeEstimate: 123,
  raw: '123',
}

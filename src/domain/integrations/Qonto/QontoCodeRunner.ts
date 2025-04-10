import type {
  QontoClientInvoice,
  QontoClient,
  QontoCreateClientInvoice,
  QontoAttachment,
} from './QontoTypes'

import type { QontoCreateClient } from './QontoTypes'

export interface QontoCodeRunner {
  createClient: (account: string, client: QontoCreateClient) => Promise<QontoClient>
  createClientInvoice: (
    account: string,
    invoice: QontoCreateClientInvoice
  ) => Promise<QontoClientInvoice>
  listClientInvoices: (account: string) => Promise<QontoClientInvoice[]>
  retrieveAttachment: (
    account: string,
    attachmentId: string
  ) => Promise<QontoAttachment | undefined>
}

import type {
  QontoClient,
  QontoAttachment,
  QontoCreateClient,
  QontoClientInvoice,
  QontoCreateClientInvoice,
} from './QontoTypes'
import type { IntegrationResponse, BaseSpi } from '../base'

export interface IQontoSpi extends BaseSpi {
  createClient: (client: QontoCreateClient) => Promise<IntegrationResponse<QontoClient>>
  createClientInvoice: (
    invoice: QontoCreateClientInvoice
  ) => Promise<IntegrationResponse<QontoClientInvoice>>
  listClientInvoices: () => Promise<IntegrationResponse<QontoClientInvoice[]>>
  retrieveAttachment: (
    attachmentId: string
  ) => Promise<IntegrationResponse<QontoAttachment | undefined>>
}

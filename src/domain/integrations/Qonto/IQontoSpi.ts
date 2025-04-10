import type {
  QontoClient,
  QontoAttachment,
  QontoCreateClient,
  QontoClientInvoice,
  QontoCreateClientInvoice,
} from './QontoTypes'
import type { IntegrationResponse, BaseSpi } from '../base'
import type { QontoConfig } from './QontoConfig'

export interface IQontoSpi extends BaseSpi<QontoConfig> {
  createClient: (client: QontoCreateClient) => Promise<IntegrationResponse<QontoClient>>
  createClientInvoice: (
    invoice: QontoCreateClientInvoice
  ) => Promise<IntegrationResponse<QontoClientInvoice>>
  listClientInvoices: () => Promise<IntegrationResponse<QontoClientInvoice[]>>
  retrieveAttachment: (
    attachmentId: string
  ) => Promise<IntegrationResponse<QontoAttachment | undefined>>
}

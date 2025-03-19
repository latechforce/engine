import type {
  QontoCreateClient,
  QontoCreateClientInvoice,
} from '/domain/integrations/Qonto/QontoTypes'
import { BaseSpi } from './base'
import type { IQontoSpi } from '/domain/integrations/Qonto/IQontoSpi'

export type IQontoIntegration = IQontoSpi

export class QontoSpi extends BaseSpi<IQontoIntegration> implements IQontoSpi {
  constructor(integration: IQontoIntegration) {
    super(integration)
  }

  createClient = async (client: QontoCreateClient) => {
    return this._integration.createClient(client)
  }

  createClientInvoice = async (invoice: QontoCreateClientInvoice) => {
    return this._integration.createClientInvoice(invoice)
  }

  listClientInvoices = async () => {
    return this._integration.listClientInvoices()
  }

  retrieveAttachment = async (attachmentId: string) => {
    return this._integration.retrieveAttachment(attachmentId)
  }
}

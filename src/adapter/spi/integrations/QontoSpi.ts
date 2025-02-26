import type {
  IQontoSpi,
  QontoConfig,
  QontoCreateClient,
  QontoClient,
  QontoCreateClientInvoice,
  QontoClientInvoice,
  QontoAttachment,
} from '/domain/integrations/Qonto'

export interface IQontoIntegration {
  getConfig: () => QontoConfig
  createClient: (client: QontoCreateClient) => Promise<QontoClient>
  createClientInvoice: (invoice: QontoCreateClientInvoice) => Promise<QontoClientInvoice>
  listClientInvoices: () => Promise<QontoClientInvoice[]>
  retrieveAttachment: (attachmentId: string) => Promise<QontoAttachment | undefined>
}

export class QontoSpi implements IQontoSpi {
  constructor(private _integration: IQontoIntegration) {}

  getConfig = () => {
    return this._integration.getConfig()
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

import type { IQontoSpi } from './IQontoSpi'
import type {
  QontoClient,
  QontoCreateClient,
  QontoAttachment,
  QontoClientInvoice,
  QontoCreateClientInvoice,
} from './QontoTypes'
import { Integration } from '../base'

export interface QontoCodeRunnerIntegration {
  createClient: (client: QontoCreateClient) => Promise<QontoClient>
  createClientInvoice: (invoice: QontoCreateClientInvoice) => Promise<QontoClientInvoice>
  listClientInvoices: () => Promise<QontoClientInvoice[]>
  retrieveAttachment: (attachmentId: string) => Promise<QontoAttachment | undefined>
}

export class Qonto extends Integration<IQontoSpi> {
  constructor(spi: IQontoSpi) {
    super(spi)
  }

  get codeRunnerIntegration(): QontoCodeRunnerIntegration {
    return {
      createClient: this.createClient,
      createClientInvoice: this.createClientInvoice,
      listClientInvoices: this.listClientInvoices,
      retrieveAttachment: this.retrieveAttachment,
    }
  }

  createClient = async (client: QontoCreateClient): Promise<QontoClient> => {
    const response = await this._spi.createClient(client)
    if (response.error) return this._throwError('createClient', response.error)
    return response.data
  }

  createClientInvoice = async (invoice: QontoCreateClientInvoice): Promise<QontoClientInvoice> => {
    const response = await this._spi.createClientInvoice(invoice)
    if (response.error) return this._throwError('createClientInvoice', response.error)
    return response.data
  }

  listClientInvoices = async (): Promise<QontoClientInvoice[]> => {
    const response = await this._spi.listClientInvoices()
    if (response.error) return this._throwError('listClientInvoices', response.error)
    return response.data
  }

  retrieveAttachment = async (attachmentId: string): Promise<QontoAttachment | undefined> => {
    const response = await this._spi.retrieveAttachment(attachmentId)
    if (response.error) return this._throwError('retrieveAttachment', response.error)
    return response.data
  }
}

import type { IQontoSpi } from './IQontoSpi'
import type {
  QontoClient,
  QontoCreateClient,
  QontoAttachment,
  QontoClientInvoice,
  QontoCreateClientInvoice,
} from './QontoTypes'
import { Integration, type BaseServices } from '../base'
import type { QontoCodeRunner } from './QontoCodeRunner'
import type { QontoConfig } from './QontoConfig'

export class Qonto extends Integration<QontoConfig, IQontoSpi> {
  constructor(spis: IQontoSpi[], services: BaseServices) {
    super('qonto', spis, services)
  }

  get codeRunnerIntegration(): QontoCodeRunner {
    return {
      createClient: this.createClient,
      createClientInvoice: this.createClientInvoice,
      listClientInvoices: this.listClientInvoices,
      retrieveAttachment: this.retrieveAttachment,
    }
  }

  createClient = async (account: string, client: QontoCreateClient): Promise<QontoClient> => {
    const response = await this._spi(account).createClient(client)
    if (response.error) return Integration.throwError('createClient', response.error)
    return response.data
  }

  createClientInvoice = async (
    account: string,
    invoice: QontoCreateClientInvoice
  ): Promise<QontoClientInvoice> => {
    const response = await this._spi(account).createClientInvoice(invoice)
    if (response.error) return Integration.throwError('createClientInvoice', response.error)
    return response.data
  }

  listClientInvoices = async (account: string): Promise<QontoClientInvoice[]> => {
    const response = await this._spi(account).listClientInvoices()
    if (response.error) return Integration.throwError('listClientInvoices', response.error)
    return response.data
  }

  retrieveAttachment = async (
    account: string,
    attachmentId: string
  ): Promise<QontoAttachment | undefined> => {
    const response = await this._spi(account).retrieveAttachment(attachmentId)
    if (response.error) return Integration.throwError('retrieveAttachment', response.error)
    return response.data
  }
}

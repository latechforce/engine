import ky from 'ky'
import type { QontoClient, QontoInvoice } from './qonto.types'

export class QontoIntegration {
  private readonly apiBaseUrl = 'https://api.qonto.com/v2'

  constructor(private readonly accessToken: string) {}

  async createClient(clientData: {
    name: string
    email?: string
    phone?: string
    address?: {
      street: string
      city: string
      postal_code: string
      country: string
    }
    vat_number?: string
  }): Promise<QontoClient> {
    const response = await ky
      .post(`${this.apiBaseUrl}/clients`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        json: {
          client: clientData,
        },
      })
      .json<{ client: QontoClient }>()

    return response.client
  }

  async createInvoice(invoiceData: {
    client_id: string
    amount: number
    currency: string
    due_date: string
    items: Array<{
      description: string
      quantity: number
      unit_price: number
    }>
    reference?: string
    notes?: string
  }): Promise<QontoInvoice> {
    const response = await ky
      .post(`${this.apiBaseUrl}/invoices`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        json: {
          invoice: {
            ...invoiceData,
            items: invoiceData.items.map((item) => ({
              ...item,
              amount: item.quantity * item.unit_price,
            })),
          },
        },
      })
      .json<{ invoice: QontoInvoice }>()

    return response.invoice
  }
}

import type { Token } from '../../../../features/connection/domain/value-object/token.value-object'
import type { QontoActionSchema } from './qonto-action.schema'
import { QontoIntegration } from './qonto.integration'

export class QontoActionIntegration {
  constructor(private readonly schema: QontoActionSchema) {}

  async runAction(token: Token): Promise<Record<string, unknown>> {
    const qonto = new QontoIntegration(token.access_token)

    switch (this.schema.action) {
      case 'create-client': {
        const { name, email, phone, address, vat_number } = this.schema.params

        const clientData = {
          name,
          email,
          phone,
          address,
          vat_number,
        }

        return qonto.createClient(clientData)
      }

      case 'create-invoice': {
        const { client_id, amount, currency, due_date, items, reference, notes } =
          this.schema.params

        const invoiceData = {
          client_id,
          amount,
          currency,
          due_date,
          items,
          reference,
          notes,
        }

        return qonto.createInvoice(invoiceData)
      }

      default: {
        const _exhaustiveCheck: never = this.schema
        throw new Error(`Unhandled case: ${_exhaustiveCheck}`)
      }
    }
  }
}

import type { IGoCardlessIntegration } from '/adapter/spi/integrations/GoCardlessSpi'
import type { IntegrationResponse } from '/domain/integrations/base'
import type {
  GoCardlessPayment,
  GoCardlessConfig,
  GoCardlessCreatePayment,
  GoCardlessListPayment,
  GoCardlessPaymentList,
} from '/domain/integrations/GoCardless'
import { BaseMockIntegration } from '../base'
import type { SQLiteDatabaseTableDriver } from '../../../../drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'
import type { RecordFields } from '/domain/entities/Record'
import type { FilterDto } from '/domain/entities/Filter'

type PaymentFields = {
  amount: number
  currency: string
  status: string
  charge_date: string
  mandate: string
  metadata: string | null
  reference: string | null
  description: string | null
  amount_refunded: number
  retry_if_possible: boolean
}

type PaymentRecordFields = RecordFields & PaymentFields

export class GoCardlessIntegration extends BaseMockIntegration implements IGoCardlessIntegration {
  private _payments: SQLiteDatabaseTableDriver

  constructor(public config: GoCardlessConfig) {
    super(config, config.accessToken)
    this._payments = this._db.table({
      name: 'payments',
      fields: [
        { name: 'amount', type: 'Number' },
        { name: 'currency', type: 'SingleLineText' },
        { name: 'status', type: 'SingleLineText' },
        { name: 'charge_date', type: 'SingleLineText' },
        { name: 'mandate', type: 'SingleLineText' },
        { name: 'metadata', type: 'SingleLineText' },
        { name: 'reference', type: 'SingleLineText' },
        { name: 'description', type: 'SingleLineText' },
        { name: 'amount_refunded', type: 'Number' },
        { name: 'retry_if_possible', type: 'Checkbox' },
      ],
    })
    this._payments.ensureSync()
  }

  createPayment = async (
    payment: GoCardlessCreatePayment
  ): Promise<IntegrationResponse<GoCardlessPayment>> => {
    const id = `PM${Date.now()}${Math.random().toString(36).substring(2, 10)}`
    const createdAt = new Date().toISOString()
    const chargeDate = new Date()
    chargeDate.setDate(chargeDate.getDate() + 3) // Default to 3 days from now

    await this._payments.insert({
      id,
      created_at: createdAt,
      fields: {
        amount: payment.amount,
        currency: payment.currency,
        status: 'pending_submission',
        charge_date: payment.charge_date || chargeDate.toISOString(),
        mandate: payment.mandate,
        metadata: payment.metadata ? JSON.stringify(payment.metadata) : null,
        reference: payment.reference || null,
        description: payment.description || null,
        amount_refunded: 0,
        retry_if_possible: payment.retry_if_possible ?? false,
      },
    })

    return {
      data: {
        id,
        amount: payment.amount,
        currency: payment.currency,
        status: 'pending_submission',
        charge_date: payment.charge_date || chargeDate.toISOString(),
        created_at: createdAt,
        metadata: payment.metadata,
        reference: payment.reference || null,
        description: payment.description || null,
        links: {
          mandate: payment.mandate,
          creditor: 'CR123',
        },
        amount_refunded: 0,
        fx: {
          fx_currency: 'EUR',
          fx_amount: null,
          exchange_rate: null,
          estimated_exchange_rate: '1.1234567890',
        },
        retry_if_possible: payment.retry_if_possible ?? false,
      },
    }
  }

  listPayments = async (
    params: GoCardlessListPayment = {}
  ): Promise<IntegrationResponse<GoCardlessPaymentList>> => {
    const limit = params.limit || 10
    const after = params.after
    const before = params.before

    let filter: FilterDto | undefined
    if (after) {
      filter = {
        field: 'created_at',
        operator: 'IsAfter',
        value: after,
      }
    } else if (before) {
      filter = {
        field: 'created_at',
        operator: 'IsBefore',
        value: before,
      }
    }

    const rows = await this._payments.list<PaymentRecordFields>(filter)

    const payments: GoCardlessPayment[] = rows.map((row) => ({
      id: row.id,
      amount: row.fields.amount,
      currency: row.fields.currency,
      status: row.fields.status,
      charge_date: row.fields.charge_date,
      created_at: row.created_at,
      metadata: row.fields.metadata ? JSON.parse(row.fields.metadata) : null,
      reference: row.fields.reference,
      description: row.fields.description,
      links: {
        mandate: row.fields.mandate,
        creditor: 'CR123',
      },
      amount_refunded: row.fields.amount_refunded,
      fx: {
        fx_currency: 'EUR',
        fx_amount: null,
        exchange_rate: null,
        estimated_exchange_rate: '1.1234567890',
      },
      retry_if_possible: row.fields.retry_if_possible,
    }))

    return {
      data: {
        payments,
        meta: {
          cursors: {
            before: rows[0]?.created_at || null,
            after: rows[rows.length - 1]?.created_at || null,
          },
          limit,
        },
      },
    }
  }
}

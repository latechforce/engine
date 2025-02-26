import type { IGoCardlessIntegration } from '/adapter/spi/integrations/GoCardlessSpi'
import type {
  GoCardlessPayment,
  GoCardlessConfig,
  GoCardlessCreatePayment,
  GoCardlessListPayment,
  GoCardlessPaymentList,
} from '/domain/integrations/GoCardless'
import { Database } from 'bun:sqlite'

type PaymentRow = {
  id: string
  amount: number
  currency: string
  status: string
  charge_date: string
  created_at: string
  mandate: string
  metadata: string | null
  reference: string | null
  description: string | null
  amount_refunded: number
  retry_if_possible: boolean
}

export class GoCardlessIntegration implements IGoCardlessIntegration {
  private db: Database

  constructor(private _config?: GoCardlessConfig) {
    this.db = new Database(_config?.accessToken ?? ':memory:')
    this.db.run(`
      CREATE TABLE IF NOT EXISTS Payments (
        id TEXT PRIMARY KEY,
        amount INTEGER NOT NULL,
        currency TEXT NOT NULL,
        status TEXT NOT NULL,
        charge_date TEXT NOT NULL,
        created_at TEXT NOT NULL,
        mandate TEXT NOT NULL,
        metadata TEXT,
        reference TEXT,
        description TEXT,
        amount_refunded INTEGER DEFAULT 0,
        retry_if_possible BOOLEAN DEFAULT 0
      )
    `)
  }

  getConfig = (): GoCardlessConfig => {
    if (!this._config) {
      throw new Error('GoCardless config not set')
    }
    return this._config
  }

  createPayment = async (payment: GoCardlessCreatePayment): Promise<GoCardlessPayment> => {
    const id = `PM${Date.now()}${Math.random().toString(36).substring(2, 10)}`
    const createdAt = new Date().toISOString()
    const chargeDate = new Date()
    chargeDate.setDate(chargeDate.getDate() + 3) // Default to 3 days from now
    this.db.run(
      `
        INSERT INTO Payments (
          id, amount, currency, status, charge_date, created_at, 
          mandate, metadata, reference, description, amount_refunded, retry_if_possible
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
      [
        id,
        payment.amount,
        payment.currency,
        'pending_submission', // Default initial status
        payment.charge_date || chargeDate.toISOString(),
        createdAt,
        payment.mandate,
        payment.metadata ? JSON.stringify(payment.metadata) : null,
        payment.reference || null,
        payment.description || null,
        0, // Default amount_refunded
        payment.retry_if_possible ?? false, // Default retry_if_possible
      ]
    )
    return {
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
    }
  }

  listPayments = async (params: GoCardlessListPayment = {}): Promise<GoCardlessPaymentList> => {
    const limit = params.limit || 10
    const after = params.after
    const before = params.before

    let query = `
      SELECT 
        id, amount, currency, status, charge_date, created_at,
        metadata, reference, description, mandate,
        amount_refunded, retry_if_possible
      FROM Payments
    `
    const queryParams: string[] = []

    if (after) {
      query += ' WHERE created_at > ?'
      queryParams.push(after)
    } else if (before) {
      query += ' WHERE created_at < ?'
      queryParams.push(before)
    }

    query += ' ORDER BY created_at DESC LIMIT ?'
    queryParams.push(limit.toString())

    const rows = this.db.prepare<PaymentRow, string[]>(query).all(...queryParams)

    const payments: GoCardlessPayment[] = rows.map((row) => ({
      id: row.id,
      amount: row.amount,
      currency: row.currency,
      status: row.status,
      charge_date: row.charge_date,
      created_at: row.created_at,
      metadata: row.metadata ? JSON.parse(row.metadata) : null,
      reference: row.reference,
      description: row.description,
      links: {
        mandate: row.mandate,
        creditor: 'CR123',
      },
      amount_refunded: row.amount_refunded,
      fx: {
        fx_currency: 'EUR',
        fx_amount: null,
        exchange_rate: null,
        estimated_exchange_rate: '1.1234567890',
      },
      retry_if_possible: row.retry_if_possible,
    }))

    return {
      payments,
      meta: {
        cursors: {
          before: rows[0]?.created_at || null,
          after: rows[rows.length - 1]?.created_at || null,
        },
        limit,
      },
    }
  }
}

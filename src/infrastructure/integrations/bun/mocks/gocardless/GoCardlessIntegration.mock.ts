import type { IGoCardlessIntegration } from '/adapter/spi/integrations/GoCardlessSpi'
import type {
  GoCardlessPayment,
  GoCardlessConfig,
  GoCardlessCreatePayment,
} from '/domain/integrations/GoCardless'
import { Database } from 'bun:sqlite'

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
        description TEXT
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
          mandate, metadata, reference, description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      retry_if_possible: payment.retry_if_possible,
    }
  }
}

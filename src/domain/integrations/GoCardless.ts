export interface GoCardlessSandboxConfig {
  environment: 'sandbox'
  accessToken: string
}

export interface GoCardlessProductionConfig {
  environment: 'production'
  accessToken: string
}

export type GoCardlessConfig = GoCardlessSandboxConfig | GoCardlessProductionConfig

export interface IGoCardlessSpi {
  getConfig: () => GoCardlessConfig
  createPayment: (payment: GoCardlessCreatePayment) => Promise<GoCardlessPayment>
  listPayments: (params?: GoCardlessListPayment) => Promise<GoCardlessPaymentList>
}

export interface GoCardlessCodeRunnerIntegration {
  createPayment: (payment: GoCardlessCreatePayment) => Promise<GoCardlessPayment>
  listPayments: (params?: GoCardlessListPayment) => Promise<GoCardlessPaymentList>
}

export class GoCardless {
  constructor(private _spi: IGoCardlessSpi) {}

  get codeRunnerIntegration(): GoCardlessCodeRunnerIntegration {
    return {
      createPayment: this.createPayment,
      listPayments: this.listPayments,
    }
  }

  getConfig = (): GoCardlessConfig => {
    return this._spi.getConfig()
  }

  createPayment = async (payment: GoCardlessCreatePayment): Promise<GoCardlessPayment> => {
    return this._spi.createPayment(payment)
  }

  listPayments = async (params?: GoCardlessListPayment): Promise<GoCardlessPaymentList> => {
    return this._spi.listPayments(params)
  }
}

export interface GoCardlessCreatePayment {
  amount: number
  currency: string
  charge_date?: string
  reference?: string
  description?: string
  metadata?: Record<string, string>
  retry_if_possible?: boolean
  mandate: string
}

export interface GoCardlessPayment {
  id: string
  created_at: string
  charge_date: string
  amount: number
  description?: string | null
  currency: string
  status: string
  reference?: string | null
  metadata?: Record<string, string>
  amount_refunded: number
  fx: {
    fx_currency: string
    fx_amount: number | null
    exchange_rate: number | null
    estimated_exchange_rate: string
  }
  links: {
    mandate: string
    creditor: string
  }
  retry_if_possible: boolean
}

export interface GoCardlessListPayment {
  limit?: number
  after?: string
  before?: string
  status?: string
  mandate?: string
}

export interface GoCardlessPaymentList {
  payments: GoCardlessPayment[]
  meta: {
    cursors: {
      before: string | null
      after: string | null
    }
    limit: number
  }
}

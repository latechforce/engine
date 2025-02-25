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
}

export class GoCardless {
  constructor(private _spi: IGoCardlessSpi) {}

  getConfig = (): GoCardlessConfig => {
    return this._spi.getConfig()
  }

  createPayment = async (payment: GoCardlessCreatePayment): Promise<GoCardlessPayment> => {
    return this._spi.createPayment(payment)
  }
}

export interface GoCardlessCreatePayment {
  amount: number
  currency: string
  charge_date: string
  reference?: string
  description?: string
  metadata?: Record<string, string>
  retry_if_possible: boolean
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

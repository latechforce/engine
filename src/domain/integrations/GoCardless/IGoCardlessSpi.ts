import type { GoCardlessConfig } from './GoCardlessConfig'
import type {
  GoCardlessCreatePayment,
  GoCardlessListPayment,
  GoCardlessPayment,
  GoCardlessPaymentList,
} from './GoCardlessTypes'
import type { BaseSpi, IntegrationResponse } from '../base'

export interface IGoCardlessSpi extends BaseSpi<GoCardlessConfig> {
  createPayment: (
    payment: GoCardlessCreatePayment
  ) => Promise<IntegrationResponse<GoCardlessPayment>>
  listPayments: (
    params?: GoCardlessListPayment
  ) => Promise<IntegrationResponse<GoCardlessPaymentList>>
}

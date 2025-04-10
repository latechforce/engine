import type {
  GoCardlessCreatePayment,
  GoCardlessListPayment,
  GoCardlessPayment,
  GoCardlessPaymentList,
} from './GoCardlessTypes'

export interface GoCardlessCodeRunner {
  createPayment: (account: string, payment: GoCardlessCreatePayment) => Promise<GoCardlessPayment>
  listPayments: (account: string, params?: GoCardlessListPayment) => Promise<GoCardlessPaymentList>
}

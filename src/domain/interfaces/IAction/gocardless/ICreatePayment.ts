import type { CreatePaymentGoCardlessActionConfig } from '/domain/entities/Action/gocardless/CreatePayment'

export interface ICreatePaymentGoCardlessAction extends CreatePaymentGoCardlessActionConfig {
  integration: 'GoCardless'
  action: 'CreatePayment'
}

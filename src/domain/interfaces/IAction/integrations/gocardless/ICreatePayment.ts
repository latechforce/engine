import type { CreatePaymentGoCardlessActionConfig } from '/domain/entities/Action/integrations/gocardless/CreatePayment'

export interface ICreatePaymentGoCardlessAction extends CreatePaymentGoCardlessActionConfig {
  integration: 'GoCardless'
  action: 'CreatePayment'
}

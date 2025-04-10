import type { ListPaymentsGoCardlessActionConfig } from '/domain/entities/Action/integrations/gocardless/ListPayments'

export interface IListPaymentsGoCardlessAction extends ListPaymentsGoCardlessActionConfig {
  integration: 'GoCardless'
  action: 'ListPayments'
}

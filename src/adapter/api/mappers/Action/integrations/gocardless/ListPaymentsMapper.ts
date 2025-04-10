import {
  type ListPaymentsGoCardlessActionConfig,
  type ListPaymentsGoCardlessActionServices,
  type ListPaymentsGoCardlessActionIntegrations,
  ListPaymentsGoCardlessAction,
} from '/domain/entities/Action/integrations/gocardless/ListPayments'

export type ListPaymentsMapperServices = ListPaymentsGoCardlessActionServices
export type ListPaymentsMapperIntegrations = ListPaymentsGoCardlessActionIntegrations

export class ListPaymentsGoCardlessActionMapper {
  static toEntity = (
    config: ListPaymentsGoCardlessActionConfig,
    services: ListPaymentsMapperServices,
    integrations: ListPaymentsMapperIntegrations
  ): ListPaymentsGoCardlessAction => {
    return new ListPaymentsGoCardlessAction(config, services, integrations)
  }
}

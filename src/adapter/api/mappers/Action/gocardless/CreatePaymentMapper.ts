import {
  CreatePaymentGoCardlessAction,
  type CreatePaymentGoCardlessActionConfig,
  type CreatePaymentGoCardlessActionServices,
  type CreatePaymentGoCardlessActionIntegrations,
} from '/domain/entities/Action/gocardless/CreatePayment'

export type CreatePaymentGoCardlessActionMapperServices = CreatePaymentGoCardlessActionServices

export type CreatePaymentGoCardlessActionMapperIntegrations =
  CreatePaymentGoCardlessActionIntegrations

export class CreatePaymentGoCardlessActionMapper {
  static toEntity = (
    config: CreatePaymentGoCardlessActionConfig,
    services: CreatePaymentGoCardlessActionMapperServices,
    integrations: CreatePaymentGoCardlessActionMapperIntegrations
  ): CreatePaymentGoCardlessAction => {
    return new CreatePaymentGoCardlessAction(config, services, integrations)
  }
}

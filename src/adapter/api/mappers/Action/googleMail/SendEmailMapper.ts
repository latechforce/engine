import {
  SendEmailGoogleMailAction,
  type SendEmailGoogleMailActionConfig,
  type SendEmailGoogleMailActionServices,
  type SendEmailGoogleMailActionIntegrations,
} from '/domain/entities/Action/googleMail/SendEmail'

export type SendEmailGoogleMailActionMapperServices = SendEmailGoogleMailActionServices

export type SendEmailGoogleMailActionMapperIntegrations = SendEmailGoogleMailActionIntegrations

export class SendEmailGoogleMailActionMapper {
  static toEntity = (
    config: SendEmailGoogleMailActionConfig,
    services: SendEmailGoogleMailActionMapperServices,
    integrations: SendEmailGoogleMailActionIntegrations
  ): SendEmailGoogleMailAction => {
    return new SendEmailGoogleMailAction(config, services, integrations)
  }
}

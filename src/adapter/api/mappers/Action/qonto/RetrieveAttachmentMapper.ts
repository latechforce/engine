import {
  RetrieveAttachmentQontoAction,
  type RetrieveAttachmentQontoActionConfig,
  type RetrieveAttachmentQontoActionServices,
  type RetrieveAttachmentQontoActionIntegrations,
} from '../../../../../domain/entities/Action/qonto/RetrieveAttachment'

export type RetrieveAttachmentQontoActionMapperServices = RetrieveAttachmentQontoActionServices
export type RetrieveAttachmentQontoActionMapperIntegrations =
  RetrieveAttachmentQontoActionIntegrations

export class RetrieveAttachmentQontoActionMapper {
  static toEntity = (
    config: RetrieveAttachmentQontoActionConfig,
    services: RetrieveAttachmentQontoActionMapperServices,
    integrations: RetrieveAttachmentQontoActionMapperIntegrations
  ): RetrieveAttachmentQontoAction => {
    return new RetrieveAttachmentQontoAction(config, services, integrations)
  }
}

import {
  ApiCalledHttpTrigger,
  type ApiCalledHttpTriggerConfig,
  type ApiCalledHttpTriggerServices,
} from '/domain/entities/Trigger/services/http/ApiCalled'

export class ApiCalledHttpTriggerMapper {
  static toEntity = (
    config: ApiCalledHttpTriggerConfig,
    services: ApiCalledHttpTriggerServices
  ): ApiCalledHttpTrigger => {
    return new ApiCalledHttpTrigger(config, services)
  }
}

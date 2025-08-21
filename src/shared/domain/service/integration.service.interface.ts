import type { IntegrationActionSchema } from '../../integrations/core/action.schema'
import type { Connection } from '../../../features/connection/domain/entity/connection.entity'
import type { ActionResult } from '../../../features/action/domain/value-object/action-result.value-object'
import type { IntegrationError } from '../../../features/action/domain/value-object/integration-error.value-object'

export interface IIntegrationService {
  execute(
    integration: IntegrationActionSchema,
    connection: Connection
  ): Promise<ActionResult<IntegrationError>>
}

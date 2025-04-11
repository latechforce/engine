import { BaseMockIntegration } from '../base'
import type { IPhantombusterIntegration } from '/adapter/spi/integrations/PhantombusterSpi'
import type { IntegrationResponse } from '/domain/integrations/base'
import type {
  PhantombusterConfig,
  PhantombusterAgentOutput,
} from '/domain/integrations/Phantombuster'
import type { SQLiteDatabaseTableDriver } from '../../../../drivers/bun/DatabaseDriver/SQLite/SQLiteTableDriver'

type AgentOutputRecordFields = {
  data: string
}

export class PhantombusterIntegration
  extends BaseMockIntegration
  implements IPhantombusterIntegration
{
  private _agentOutputs: SQLiteDatabaseTableDriver

  constructor(public config: PhantombusterConfig) {
    super(config, config.apiKey)
    this._agentOutputs = this._db.table({
      name: 'agent_outputs',
      fields: [{ name: 'data', type: 'SingleLineText' }],
    })
    this._agentOutputs.ensureSync()
  }

  fetchAgentOutput = async (
    agentId: string
  ): Promise<IntegrationResponse<PhantombusterAgentOutput>> => {
    const result = await this._agentOutputs.readById<AgentOutputRecordFields>(agentId)
    if (!result) {
      return {
        error: {
          status: 400,
          message: 'Agent not found',
        },
      }
    }
    const data = JSON.parse(result.fields.data)
    return { data }
  }

  addAgentOutput = async (id: string, output: PhantombusterAgentOutput): Promise<void> => {
    const data = JSON.stringify(output)
    await this._agentOutputs.insert({
      id,
      created_at: new Date().toISOString(),
      fields: {
        data,
      },
    })
  }
}

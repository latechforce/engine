import type { IPhantombusterIntegration } from '/adapter/spi/integrations/PhantombusterSpi'
import type {
  PhantombusterConfig,
  PhantombusterAgentOutput,
} from '/domain/integrations/Phantombuster'
import { Database } from 'bun:sqlite'

export class PhantombusterIntegration implements IPhantombusterIntegration {
  private db: Database

  constructor(private _config?: PhantombusterConfig) {
    this.db = new Database(_config?.apiKey ?? ':memory:')
    this.db.run(`
      CREATE TABLE IF NOT EXISTS agent_outputs (
        id TEXT PRIMARY KEY,
        data TEXT NOT NULL
      )
    `)
  }

  getConfig = (): PhantombusterConfig => {
    if (!this._config) {
      throw new Error('Phantombuster config not set')
    }
    return this._config
  }

  fetchAgentOutput = async (agentId: string): Promise<PhantombusterAgentOutput> => {
    const result = this.db
      .query<{ data: string }, [string]>('SELECT data FROM agent_outputs WHERE id = ?')
      .get(agentId)
    if (!result) {
      throw new Error(`Agent not found`)
    }
    return JSON.parse(result.data)
  }

  addAgentOutput = async (id: string, output: PhantombusterAgentOutput): Promise<void> => {
    const data = JSON.stringify(output)
    this.db.run(
      `
      INSERT OR REPLACE INTO agent_outputs (id, data)
      VALUES (?, ?)
    `,
      [id, data]
    )
  }
}

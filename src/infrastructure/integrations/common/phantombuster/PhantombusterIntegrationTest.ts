import env from '/infrastructure/test/env'
import type { IPhantombusterIntegration } from '/adapter/spi/integrations/PhantombusterSpi'
import type BunTester from 'bun:test'

export function testPhantombusterIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: IPhantombusterIntegration
) {
  const { TEST_PHANTOMBUSTER_AGENT_ID } = env

  describe('fetchAgentOutput', () => {
    it('should fetch agent output successfully', async () => {
      // GIVEN
      const agentId = TEST_PHANTOMBUSTER_AGENT_ID

      // WHEN
      const result = await integration.fetchAgentOutput(agentId)

      // THEN
      expect(result.data?.containerId).toBeDefined()
      expect(result.data?.status).toBe('finished')
    })

    it('should handle non-existent agent', async () => {
      // GIVEN
      const agentId = 'non-existent-agent'

      // WHEN
      const call = () => integration.fetchAgentOutput(agentId)

      // THEN
      expect(call()).rejects.toThrow('Agent not found')
    })
  })
}

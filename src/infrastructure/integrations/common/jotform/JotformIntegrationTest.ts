import type { IJotformIntegration } from '/adapter/spi/integrations/JotformSpi'
import type BunTester from 'bun:test'

export function testJotformIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: IJotformIntegration
) {
  describe('JotformIntegration', () => {
    it('should be able to test connection', async () => {
      // WHEN
      const result = await integration.testConnection()

      // THEN
      expect(result).toBeUndefined()
    })
  })
}

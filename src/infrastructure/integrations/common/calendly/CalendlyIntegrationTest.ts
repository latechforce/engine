import type { ICalendlyIntegration } from '/adapter/spi/integrations/CalendlySpi'
import type BunTester from 'bun:test'

export function testCalendlyIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: ICalendlyIntegration
) {
  describe('CalendlyIntegration', () => {
    it.skip('should be able to check configuration', async () => {
      // WHEN
      const result = await integration.checkConfiguration()

      // THEN
      expect(result).toBeUndefined()
    })
  })
}

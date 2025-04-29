import type { IZoomIntegration } from '/adapter/spi/integrations/ZoomSpi'
import type BunTester from 'bun:test'

export function testZoomIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: IZoomIntegration
) {
  describe('ZoomIntegration', () => {
    it('should be able to test connection', async () => {
      // WHEN
      const result = await integration.testConnection()

      // THEN
      expect(result).toBeUndefined()
    })
  })
}

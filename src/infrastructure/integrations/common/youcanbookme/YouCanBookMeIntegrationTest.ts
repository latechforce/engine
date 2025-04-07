import type { IYouCanBookMeIntegration } from '/adapter/spi/integrations/YouCanBookMeSpi'
import type BunTester from 'bun:test'

export function testYouCanBookMeIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: IYouCanBookMeIntegration
) {
  describe('YouCanBookMeIntegration', () => {
    it('should be able to check configuration', async () => {
      // WHEN
      const result = await integration.checkConfiguration()

      // THEN
      expect(result).toBeUndefined()
    })
  })
}

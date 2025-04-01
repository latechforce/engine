import type { ICalendlyIntegration } from '/adapter/spi/integrations/CalendlySpi'
import type BunTester from 'bun:test'

export function testCalendlyIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: ICalendlyIntegration
) {
  describe('CalendlyIntegration', () => {
    it('should be able to check configuration', async () => {
      // WHEN
      const result = await integration.checkConfiguration()

      // THEN
      expect(result).toBeUndefined()
    })

    it('should be able to list webhook subscriptions', async () => {
      // WHEN
      const currentUser = await integration.currentUser()

      expect(currentUser.error).toBeUndefined()

      const result = await integration.listWebhookSubscriptions({
        scope: 'user',
        organization: currentUser.data?.current_organization,
        count: 10,
        user: currentUser.data?.uri,
      })

      // THEN
      expect(result.error).toBeUndefined()
      expect(result.data).toBeDefined()
      if (result.data) {
        expect(Array.isArray(result.data.collection)).toBe(true)
        expect(result.data.pagination).toBeDefined()
        expect(typeof result.data.pagination.count).toBe('number')
      }
    })
  })
}

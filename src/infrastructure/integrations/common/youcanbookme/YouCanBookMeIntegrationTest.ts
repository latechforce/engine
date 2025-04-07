import type { IYouCanBookMeIntegration } from '/adapter/spi/integrations/YouCanBookMeSpi'
import type BunTester from 'bun:test'
import env from '/infrastructure/test/env'
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

    it('should get profile by id', async () => {
      // WHEN
      const profileId = env.TEST_YOUCANBOOKME_USERNAME
      const result = await integration.getProfile(profileId)

      // THEN
      expect(result).toBeDefined()
      expect(result.data).toBeDefined()
      expect(result.data?.id).toBeDefined()
      expect(result.data?.title).toBeDefined()
      expect(result.data?.status).toBeDefined()
    })
  })
}

import type { IYouCanBookMeIntegration } from '/adapter/spi/integrations/YouCanBookMeSpi'
import type BunTester from 'bun:test'

export function testYouCanBookMeIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: IYouCanBookMeIntegration
) {
  describe('YouCanBookMeIntegration', () => {
    it('should be able to test connection', async () => {
      // WHEN
      const result = await integration.testConnection()

      // THEN
      expect(result).toBeUndefined()
    })

    it('should get profile by id', async () => {
      // WHEN
      const result = await integration.getProfile('mock-username')

      // THEN
      expect(result).toBeDefined()
      expect(result.data).toBeDefined()
      expect(result.data?.id).toBeDefined()
      expect(result.data?.title).toBeDefined()
      expect(result.data?.status).toBeDefined()
    })

    it('should update a profile', async () => {
      // WHEN
      const updateData = {
        title: 'string',
        description: 'string',
        timeZone: 'America/New_York',
      }
      const result = await integration.updateProfile('mock-username', updateData)

      // THEN
      expect(result).toBeDefined()
      expect(result.error).toBeUndefined()
      expect(result.data).toBeDefined()
      expect(result.data?.title).toBe(updateData.title)
      expect(result.data?.description).toBe(updateData.description)
      expect(result.data?.timeZone).toBe(updateData.timeZone)
    })
  })
}

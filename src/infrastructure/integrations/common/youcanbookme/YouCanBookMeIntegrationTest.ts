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

    it('should update a profile', async () => {
      // WHEN
      const profileId = env.TEST_YOUCANBOOKME_USERNAME
      const updateData = {
        title: 'Updated Title',
        description: 'Updated Description',
        timeZone: 'Europe/Paris',
      }
      const result = await integration.updateProfile(profileId, updateData)

      // THEN
      expect(result).toBeDefined()
      expect(result.error).toBeUndefined()
      expect(result.data).toBeDefined()
      expect(result.data?.title).toBe(updateData.title)
      expect(result.data?.description).toBe(updateData.description)
      expect(result.data?.timeZone).toBe(updateData.timeZone)
    })

    it('should return an error when profile not found', async () => {
      // WHEN
      const result = await integration.updateProfile('non-existent-id', { title: 'New Title' })

      // THEN
      expect(result).toBeDefined()
      expect(result.error).toBeDefined()
      expect(result.error?.status).toBe(404)
    })
  })
}

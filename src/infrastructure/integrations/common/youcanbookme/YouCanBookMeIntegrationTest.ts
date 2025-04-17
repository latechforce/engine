import type { IYouCanBookMeIntegration } from '/adapter/spi/integrations/YouCanBookMeSpi'
import type BunTester from 'bun:test'
import { assertIsDefined } from '/infrastructure/test/common'

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

    it.skip('should create a new profile', async () => {
      // WHEN
      const profile = {
        title: 'Test Profile',
        description: 'Test Description',
        subdomain: 'test-profile',
        timeZone: 'UTC',
        locale: 'en-US',
        status: 'ONLINE' as const,
        brandingType: 'NO_BRANDING' as const,
      }
      const result = await integration.createProfile(profile)

      // THEN
      expect(result.error).toBeUndefined()
      expect(result.data).toBeDefined()

      assertIsDefined(result.data)

      console.log(result.data)

      expect(result.data.title).toBe(profile.title)
      expect(result.data.description).toBe(profile.description)
      expect(result.data.subdomain).toBe(profile.subdomain)
      expect(result.data.timeZone).toBe(profile.timeZone)
      expect(result.data.locale).toBe(profile.locale)
      expect(result.data.status).toBe(profile.status)
      expect(result.data.brandingType).toBe(profile.brandingType)
    })
  })
}

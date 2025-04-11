import type BunTester from 'bun:test'
import env from '/infrastructure/test/env'
import type { IGoogleMailIntegration } from '/adapter/spi/integrations/GoogleMailSpi'

export function testGoogleMailIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: IGoogleMailIntegration
) {
  describe('sendEmail', () => {
    it('should send an email', async () => {
      // GIVEN
      const options = {
        from: env.TEST_GOOGLE_MAIL_USER,
        to: env.TEST_GOOGLE_MAIL_USER,
        subject: 'ENGINE - TEST',
        text: 'ENGINE - TEST',
      }

      // WHEN
      const result = await integration.sendEmail(options)
      if (result.error) throw new Error('Error sending email')

      // THEN
      expect(result.data?.messageId).toBeDefined()
    })
  })
}

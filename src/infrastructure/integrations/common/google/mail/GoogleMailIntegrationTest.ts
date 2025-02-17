import type BunTester from 'bun:test'
import env from '/infrastructure/test/env'
import type { IGoogleMailIntegration } from '/adapter/spi/integrations/GoogleMailSpi'

export function testGoogleMailIntegration(
  { describe, beforeAll, afterAll, it, expect }: typeof BunTester,
  setup: () => Promise<IGoogleMailIntegration>,
  teardown?: () => Promise<void>
) {
  let gmail: IGoogleMailIntegration

  beforeAll(async () => {
    gmail = await setup()
  })

  afterAll(async () => {
    if (teardown) await teardown()
  })

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
      const email = await gmail.sendEmail(options)

      // THEN
      expect(email.messageId).toBeDefined()
    })
  })
}

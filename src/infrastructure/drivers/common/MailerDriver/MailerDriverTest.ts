import type BunTester from 'bun:test'
import type { IMailerDriver } from '/adapter/spi/drivers/MailerSpi'
import env from '/infrastructure/test/env'

export function testMailerDriver(
  { describe, beforeAll, afterAll, it, expect }: typeof BunTester,
  setup: () => Promise<IMailerDriver>,
  teardown?: () => Promise<void>
) {
  let mailer: IMailerDriver

  beforeAll(async () => {
    mailer = await setup()
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
      const email = await mailer.sendEmail(options)

      // THEN
      expect(email.messageId).toBeDefined()
    })
  })
}

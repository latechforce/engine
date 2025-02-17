import BunTester from 'bun:test'
import { NodemailerDriver } from './NodemailerDriver'
import env from '/infrastructure/test/env'
import { testMailerDriver } from './MailerDriverTest'

const integration = new NodemailerDriver({
  service: 'gmail',
  user: env.TEST_GOOGLE_MAIL_USER,
  pass: env.TEST_GOOGLE_MAIL_PASSWORD,
})

const setup = async () => {
  return integration
}

testMailerDriver(BunTester, setup)

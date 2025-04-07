import { YouCanBookMeIntegration } from './YouCanBookMeIntegration.mock'
import { testYouCanBookMeIntegration } from '/infrastructure/integrations/common/youcanbookme/YouCanBookMeIntegrationTest'
import BunTester from 'bun:test'

export const integration = new YouCanBookMeIntegration({
  user: {
    username: ':memory:',
    password: ':memory:',
  },
})

testYouCanBookMeIntegration(BunTester, integration)

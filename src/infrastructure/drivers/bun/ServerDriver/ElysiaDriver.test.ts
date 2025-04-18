import BunTester from 'bun:test'
import { testServerDriver } from '../../common/ServerDriver/ServerDriverTest'
import { ElysiaDriver } from './ElysiaDriver'

const serverConfig = {
  env: 'test',
  port: 3001,
  appName: 'Test Title',
  appVersion: '1.0.0',
  appDescription: 'Test Description',
  apiKeys: ['test-key'],
}

const integration = new ElysiaDriver(serverConfig)

testServerDriver(BunTester, integration)

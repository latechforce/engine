import App from '../../../bun'
import { mocks } from '/infrastructure/integrations/bun/mocks'

export class MockedApp extends App {
  constructor() {
    super({ integrations: mocks })
  }
}

import App, { mocks } from '../../../bun'

export class MockedApp extends App {
  constructor() {
    super({ integrations: mocks })
  }
}

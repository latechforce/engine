import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationActionServiceCodeRunTypescriptWithLoggerInfoService } from '/examples/config/automation/action/service/code/runTypescript/withService/logger/info'
import { configAutomationActionServiceCodeRunTypescriptWithLoggerErrorService } from '/examples/config/automation/action/service/code/runTypescript/withService/logger/error'
import { configAutomationActionServiceCodeRunTypescriptWithLoggerDebugService } from '/examples/config/automation/action/service/code/runTypescript/withService/logger/debug'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should run a Typescript code with a logger info', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithLoggerInfoService
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/fetcher-get`)

      // THEN
      expect(response.success).toBe(true)
    })

    it('should run a Typescript code with a logger error', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithLoggerErrorService
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/fetcher-get`)

      // THEN
      expect(response.success).toBe(true)
    })

    it('should run a Typescript code with a logger debug', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithLoggerDebugService
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/fetcher-get`)

      // THEN
      expect(response.success).toBe(true)
    })
  })
})

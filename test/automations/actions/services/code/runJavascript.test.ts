import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationActionServiceCodeRunJavascript } from '/examples/config/automation/action/service/code/runJavascript'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should run a JavaScript code', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionServiceCodeRunJavascript)

      // WHEN
      const response = await request.post(`${url}/api/automation/run-javascript`)

      // THEN
      expect(response.message).toBe('Hello, world!')
    })
  })
})

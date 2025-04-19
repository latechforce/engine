import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationTriggerServiceHttpApiCalledAuth } from '/examples/config/automation/trigger/service/http/apiCalled/auth'
import { configAutomationTriggerServiceHttpApiCalled } from '/examples/config/automation/trigger/service/http/apiCalled'
import { configAutomationTriggerServiceHttpApiCalledOutput } from '/examples/config/automation/trigger/service/http/apiCalled/output'
import { configAutomationTriggerServiceHttpApiCalledWithErrorAction } from '/examples/config/automation/trigger/service/http/apiCalled/withErrorAction'
import { configAutomationTriggerServiceHttpApiCalledInput } from '/examples/config/automation/trigger/service/http/apiCalled/input'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should run an automation', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationTriggerServiceHttpApiCalled)

      // WHEN
      const response = await request.post(`${url}/api/automation/run`)

      // THEN
      expect(response.success).toBeTruthy()
    })

    it('should not run an automation with auth', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationTriggerServiceHttpApiCalledAuth)

      // WHEN
      const response = await request.post(`${url}/api/automation/run`)

      // THEN
      expect(response.error).toBe('Unauthorized: Invalid API Key')
    })

    it('should run an automation with auth', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationTriggerServiceHttpApiCalledAuth)

      // WHEN
      const response = await request.post(
        `${url}/api/automation/run`,
        {},
        {
          headers: { 'x-api-key': 'test-key' },
        }
      )

      // THEN
      expect(response.success).toBeTruthy()
    })

    it('should return a value', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationTriggerServiceHttpApiCalledOutput)

      // WHEN
      const response = await request.post(`${url}/api/automation/run`)

      // THEN
      expect(response.value).toBe('hello')
    })

    it('should return a error message', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationTriggerServiceHttpApiCalledWithErrorAction)

      // WHEN
      const response = await fetch(`${url}/api/automation/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      // THEN
      const { error } = await response.json()
      expect(response.status).toBe(400)
      expect(error).toBe('Test error')
    })

    it('should return run an automation with a body', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationTriggerServiceHttpApiCalledInput)

      // WHEN
      const response = await request.post(`${url}/api/automation/run`, { text: 'hello' })

      // THEN
      expect(response.success).toBeTruthy()
    })

    it('should return an invalid body error', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationTriggerServiceHttpApiCalledInput)

      // WHEN
      const response = await fetch(`${url}/api/automation/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      // THEN
      const error = await response.json()
      expect(response.status).toBe(422)
      expect(error.on).toBe('body')
      expect(error.type).toBe('validation')
    })
  })
})

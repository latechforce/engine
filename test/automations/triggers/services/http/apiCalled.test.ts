import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getAutomationSchema } from '/test/common'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should run an automation', async () => {
      // GIVEN
      const config = getAutomationSchema('ApiCalled')
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/run`)

      // THEN
      expect(response.success).toBeTruthy()
    })

    it('should not run an automation with auth', async () => {
      // GIVEN
      const config = getAutomationSchema('ApiCalledWithApiKeyAuth')
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/run`)

      // THEN
      expect(response.error).toBe('Unauthorized: Invalid API Key')
    })

    it('should run an automation with auth', async () => {
      // GIVEN
      const config = getAutomationSchema('ApiCalledWithApiKeyAuth')
      const { url } = await app.start(config)

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
      const config = getAutomationSchema('ApiCalledWithReturnedValue')
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/run`)

      // THEN
      expect(response.value).toBe('hello')
    })

    it('should return a error message', async () => {
      // GIVEN
      const config = getAutomationSchema('ApiCalledWithError')
      const { url } = await app.start(config)

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
      const config = getAutomationSchema('ApiCalledWithSingleLineTextInput')
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/run`, { text: 'hello' })

      // THEN
      expect(response.success).toBeTruthy()
    })

    it('should return an invalid body error', async () => {
      // GIVEN
      const config = getAutomationSchema('ApiCalledWithSingleLineTextInput')
      const { url } = await app.start(config)

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

import Tester, { expect, describe, it } from 'bun:test'
import { Helpers } from '/test/bun'
import { getAutomationConfig } from '/test/config'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({}, ({ app, request }) => {
  describe('on POST', () => {
    it('should run an automation', async () => {
      // GIVEN
      const config = getAutomationConfig('ApiCalled')
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/run`)

      // THEN
      expect(response.success).toBeTruthy()
    })

    it('should return a value', async () => {
      // GIVEN
      const config = getAutomationConfig('ApiCalledWithReturnedValue')
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/run`)

      // THEN
      expect(response.value).toBe('hello')
    })

    it('should return a error message', async () => {
      // GIVEN
      const config = getAutomationConfig('ApiCalledWithError')
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
      const config = getAutomationConfig('ApiCalledWithTextInput')
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/run`, { text: 'hello' })

      // THEN
      expect(response.success).toBeTruthy()
    })

    it('should return an invalid body error', async () => {
      // GIVEN
      const config = getAutomationConfig('ApiCalledWithTextInput')
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
      expect(error).toStrictEqual({
        keyword: 'required',
        instancePath: '',
        schemaPath: '#/required',
        params: {
          missingProperty: 'text',
        },
        message: "must have required property 'text'",
      })
    })
  })
})

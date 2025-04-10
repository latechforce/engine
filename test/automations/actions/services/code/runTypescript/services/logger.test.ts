import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should run a Typescript code with a logger info', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        engine: '1.0.0',
        automations: [
          {
            name: 'fetcherGet',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'fetcher-get',
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function (context: CodeRunnerContext) {
                  const { logger } = context.services
                  logger.info('Hello World')
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/fetcher-get`)

      // THEN
      expect(response.success).toBe(true)
    })

    it('should run a Typescript code with a logger error', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        engine: '1.0.0',
        automations: [
          {
            name: 'fetcherGet',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'fetcher-get',
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function (context: CodeRunnerContext) {
                  const { logger } = context.services
                  logger.error('Hello World')
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/fetcher-get`)

      // THEN
      expect(response.success).toBe(true)
    })

    it('should run a Typescript code with a logger debug', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        engine: '1.0.0',
        automations: [
          {
            name: 'fetcherGet',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'fetcher-get',
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function (context: CodeRunnerContext) {
                  const { logger } = context.services
                  logger.debug('Hello World')
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/fetcher-get`)

      // THEN
      expect(response.success).toBe(true)
    })
  })
})

import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'

const mock = new Mock(Tester, { drivers: ['Fetcher'] })

mock.request(({ app, request, drivers }) => {
  describe('on POST', () => {
    it('should run a Typescript code with a fetcher get', async () => {
      // GIVEN
      await drivers.fetcher.mock('GET', 'https://example.com/', async () => {
        return new Response('<html></html>', { status: 200 })
      })
      const config: Config = {
        name: 'App',
        version: '1.0.0',
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
                  const { fetcher } = context.services
                  await fetcher.get('https://example.com/')
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

    it('should run a Typescript code with a fetcher post', async () => {
      // GIVEN
      await drivers.fetcher.mock('POST', 'https://example.com/', async () => {
        return new Response(JSON.stringify({ name: 'John' }), { status: 200 })
      })
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'fetcherPost',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'fetcher-post',
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function (context: CodeRunnerContext) {
                  const { fetcher } = context.services
                  await fetcher.post(
                    'https://example.com/',
                    { name: 'Joe' },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    }
                  )
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/fetcher-post`)

      // THEN
      expect(response.success).toBe(true)
    })

    it('should run a Typescript code with a fetcher put', async () => {
      // GIVEN
      await drivers.fetcher.mock('PUT', 'https://example.com/', async () => {
        return new Response(JSON.stringify({ name: 'John' }), { status: 200 })
      })
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'fetcherPut',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'fetcher-put',
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function (context: CodeRunnerContext) {
                  const { fetcher } = context.services
                  await fetcher.put(
                    'https://example.com/',
                    { name: 'Joe' },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    }
                  )
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/fetcher-put`)

      // THEN
      expect(response.success).toBe(true)
    })
  })
})

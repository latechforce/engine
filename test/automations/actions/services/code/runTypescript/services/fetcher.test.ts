import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationActionServiceCodeRunTypescriptWithFetcherGetService } from '/examples/config/automation/action/service/code/runTypescript/withService/fetcher/get'
import { configAutomationActionServiceCodeRunTypescriptWithFetcherPostService } from '/examples/config/automation/action/service/code/runTypescript/withService/fetcher/post'
import { configAutomationActionServiceCodeRunTypescriptWithFetcherPutService } from '/examples/config/automation/action/service/code/runTypescript/withService/fetcher/put'

const mock = new Mock(Tester, { drivers: ['Fetcher'] })

mock.request(({ app, request, drivers }) => {
  describe('on POST', () => {
    it('should run a Typescript code with a fetcher get', async () => {
      // GIVEN
      await drivers.fetcher.mock('GET', 'https://example.com/', async () => {
        return new Response('<html></html>', { status: 200 })
      })
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithFetcherGetService
      )

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
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithFetcherPostService
      )

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
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithFetcherPutService
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/fetcher-put`)

      // THEN
      expect(response.success).toBe(true)
    })
  })
})

import App from '@/app'
import type { AppSchema } from '@/types'
import { test, expect } from 'bun:test'

test('should start an app with 100 triggers', async () => {
  // GIVEN
  const schema: AppSchema = {
    automations: Array.from({ length: 100 }).map((_, index) => ({
      id: index + 1,
      name: `Automation ${index + 1}`,
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: `/${index + 1}`,
        },
      },
      actions: [],
    })),
  }

  // WHEN
  const app = await new App().start(schema)

  // THEN
  const response = await fetch(app.url('/api/health'))
  expect(response.status).toBe(200)
})

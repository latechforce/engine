import { describe, it, expect } from 'bun:test'
import App from '@/app'

describe('start', () => {
  it('should serve static files', async () => {
    // GIVEN
    const app = await new App().start()

    // WHEN
    const response = await fetch(app.url('/static/favicon.ico'))

    // THEN
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('image/x-icon')
  })
})

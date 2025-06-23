import { describe, it, expect } from 'bun:test'
import App from '@/app'

describe('start', () => {
  it('should serve static files', async () => {
    const initStaticPath = process.env.STATIC_PATH
    process.env.STATIC_PATH = 'test/app/static'

    // WHEN
    const app = await new App().start()

    // THEN
    const response = await fetch(app.url('/static/img.png'))
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('image/png')
    process.env.STATIC_PATH = initStaticPath
  })
})

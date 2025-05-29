import { injectable } from 'inversify'
import type { Mock } from '../../domain/value-object/mock.value-object'

@injectable()
export class MockAppUseCase {
  execute(mock: Mock) {
    const originalFetch = globalThis.fetch

    globalThis.fetch = Object.assign(
      async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = input instanceof Request ? input.url : input.toString()
        const method = input instanceof Request ? input.method : (init?.method ?? 'GET')

        for (const [path, methods] of Object.entries(mock)) {
          if (url.includes(path)) {
            const handler = methods[method]
            if (handler) {
              const { json, status = 200 } = handler(new Request(input, init))
              return new Response(JSON.stringify(json), { status })
            }
          }
        }

        return originalFetch(input, init)
      },
      {
        preconnect: (_url: string | URL) => {},
      }
    )
  }
}

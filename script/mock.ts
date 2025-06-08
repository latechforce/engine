import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { mock } from 'bun:test'

type Handler = () => { json: object; status?: number }

export type Handlers = {
  [key: string]: {
    POST?: Handler
    GET?: Handler
    PATCH?: Handler
    PUT?: Handler
    DELETE?: Handler
  }
}

const mockGoogleApis = (handlers: Handlers) => {
  mock.module('googleapis', () => {
    return {
      google: {
        auth: {
          OAuth2: class {
            generateAuthUrl() {
              return 'https://mock-auth-url'
            }
            async getToken() {
              return handlers['https://oauth2.googleapis.com/token']?.POST?.()?.json
            }
            setCredentials() {}
            on() {}
          },
        },
        oauth2: () => {
          return {
            userinfo: {
              get: async () => {
                return handlers['https://www.googleapis.com/oauth2/v2/userinfo']?.GET?.()?.json
              },
            },
          }
        },
      },
    }
  })
}

export const mockServer = (handlers: Handlers) => {
  const serverHandlers = []
  mockGoogleApis(handlers)
  for (const [endpoint, methods] of Object.entries(handlers)) {
    for (const [method, response] of Object.entries(methods)) {
      const { json, status = 200 } = response()
      switch (method) {
        case 'GET':
          serverHandlers.push(http.get(endpoint, () => HttpResponse.json(json, { status })))
          break
        case 'POST':
          serverHandlers.push(http.post(endpoint, () => HttpResponse.json(json, { status })))
          break
        case 'PATCH':
          serverHandlers.push(http.patch(endpoint, () => HttpResponse.json(json, { status })))
          break
        case 'PUT':
          serverHandlers.push(http.put(endpoint, () => HttpResponse.json(json, { status })))
          break
        case 'DELETE':
          serverHandlers.push(http.delete(endpoint, () => HttpResponse.json(json, { status })))
          break
        default:
          throw new Error(`Unsupported method: ${method}`)
      }
    }
  }
  const server = setupServer(...serverHandlers)
  server.listen()
  process.on('SIGINT', () => {
    server.close()
    process.exit(0)
  })
}

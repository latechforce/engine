import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { mock } from 'bun:test'

type Handler = () => Promise<{ json: object; status?: number }>

export type Handlers = {
  [key: string]: {
    POST?: Handler
    GET?: Handler
    PATCH?: Handler
    PUT?: Handler
    DELETE?: Handler
  }
}

const mockNotionClient = (handlers: Handlers) => {
  mock.module('@notionhq/client', () => {
    return {
      Client: class {
        constructor() {}
        pages = {
          create: async () => {
            const response = await handlers['https://api.notion.com/v1/pages']?.POST?.()
            return response?.json
          },
          retrieve: async () => {
            const response = await handlers['https://api.notion.com/v1/pages/mock-page-id']?.GET?.()
            return response?.json
          },
          update: async () => {
            const response = await handlers['https://api.notion.com/v1/pages/mock-page-id']?.PATCH?.()
            return response?.json
          },
        };
        databases = {
          query: async () => {
            const response = await handlers['https://api.notion.com/v1/databases/mock-database-id/query']?.POST?.()
            return response?.json
          },
        };
        search = async () => {
            const response = await handlers['https://api.notion.com/v1/search']?.POST?.()
            return response?.json
        };
        users = {
          me: async () => {
            const response = await handlers['https://api.notion.com/v1/users/me']?.GET?.()
            return response?.json
          },
        };
      },
    }
  })
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
              return (await handlers['https://oauth2.googleapis.com/token']?.POST?.())?.json
            }
            setCredentials() {}
            on() {}
          },
        },
        oauth2: () => {
          return {
            userinfo: {
              get: async () => {
                return (await handlers['https://www.googleapis.com/oauth2/v2/userinfo']?.GET?.())
                  ?.json
              },
            },
          }
        },
        gmail: () => {
          return {
            users: {
              messages: {
                send: async () => {
                  return (
                    await handlers[
                      'https://www.googleapis.com/gmail/v1/users/me/messages'
                    ]?.POST?.()
                  )?.json
                },
              },
              getProfile: async () => {
                return (
                  await handlers['https://www.googleapis.com/gmail/v1/users/me/profile']?.GET?.()
                )?.json
              },
            },
          }
        },
        sheets: () => {
          return {
            spreadsheets: {
              values: {
                append: async () => {
                  return (
                    await handlers[
                      'https://sheets.googleapis.com/v4/spreadsheets/1234567890/values/Sheet1!A1:append'
                    ]?.POST?.()
                  )?.json
                },
              },
            },
          }
        },
      },
    }
  })
}

export const mockServer = async (handlers: Handlers) => {
  const serverHandlers = []
  mockGoogleApis(handlers)
  mockNotionClient(handlers)
  for (const [endpoint, methods] of Object.entries(handlers)) {
    for (const [method, response] of Object.entries(methods)) {
      const { json, status = 200 } = await response()
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

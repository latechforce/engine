import type { INotionIntegration } from '/adapter/spi/integrations/NotionSpi'
import { APIErrorCode, Client, isNotionClientError } from '@notionhq/client'
import { NotionTableIntegration } from './NotionTableIntegration'
import type { NotionConfig } from '/domain/integrations/Notion'
import type {
  DatabaseObjectResponse,
  ListUsersResponse,
  PartialDatabaseObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { NotionUserDto } from '/adapter/spi/dtos/NotionUserDto'
import type { NotionTablePageProperties } from '/domain/integrations/Notion'
import type { IntegrationResponse, IntegrationResponseError } from '/domain/integrations/base'

export class NotionIntegration implements INotionIntegration {
  private _notion: Client

  constructor(public config: NotionConfig) {
    const { token } = config
    this._notion = new Client({
      auth: token,
    })
  }

  testConnection = async (): Promise<IntegrationResponseError | undefined> => {
    const response = await NotionIntegration.retry(() => this._notion.users.me({}))
    if (response.error) return response
    return undefined
  }

  getTable = async <T extends NotionTablePageProperties = NotionTablePageProperties>(
    id: string
  ) => {
    const response = await NotionIntegration.retry(() =>
      this._notion.databases.retrieve({
        database_id: id,
      })
    )
    if (response.error) throw response.error
    return new NotionTableIntegration<T>(
      this._notion,
      this._throwIfNotDatabaseObjectResponse(response.data)
    )
  }

  listAllUsers = async (): Promise<IntegrationResponse<NotionUserDto[]>> => {
    const response = await NotionIntegration.retry<ListUsersResponse>(() =>
      this._notion.users.list({})
    )
    if (response.error) return response
    return {
      data: response.data.results
        .filter((user) => user.type === 'person')
        .map((user) => {
          if (!user.person?.email) {
            throw new Error('Notion user is missing person email')
          }
          return {
            id: user.id,
            email: user.person.email,
            name: user.name,
            avatarUrl: user.avatar_url,
          }
        }),
    }
  }

  private _throwIfNotDatabaseObjectResponse(
    database: DatabaseObjectResponse | PartialDatabaseObjectResponse
  ): DatabaseObjectResponse {
    if (database.object === 'database' && 'title' in database) {
      return database
    }
    throw new Error('Not a PageObjectResponse')
  }

  static retry = async <T>(fn: () => Promise<T>, retries = 3): Promise<IntegrationResponse<T>> => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const data = await fn()
        return {
          data,
        }
      } catch (error) {
        if (isNotionClientError(error)) {
          const headers = 'headers' in error ? (error.headers as Headers) : undefined
          switch (error.code) {
            case APIErrorCode.RateLimited:
              await new Promise((resolve) => {
                setTimeout(resolve, Number(headers?.get('retry-after') ?? 0) * 1000)
              })
              break
            case APIErrorCode.ConflictError:
              if (attempt < retries - 1) {
                await new Promise((resolve) => setTimeout(resolve, 2000))
              } else {
                return {
                  error: {
                    status: 500,
                    message: 'Failed after multiple conflict errors',
                  },
                }
              }
              break
            default:
              throw error
          }
        } else if (error && typeof error === 'object' && 'status' in error) {
          if (error.status === 502) {
            if (attempt < retries - 1) {
              await new Promise((resolve) => setTimeout(resolve, 10000))
            } else {
              return {
                error: {
                  status: 502,
                  message: `Failed after multiple 502 errors`,
                },
              }
            }
          } else {
            throw error
          }
        } else {
          throw error
        }
      }
    }
    return {
      error: {
        status: 500,
        message: 'Failed after multiple retries',
      },
    }
  }
}

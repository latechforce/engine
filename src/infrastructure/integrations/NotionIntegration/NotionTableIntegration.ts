import type { FilterDto } from '@adapter/spi/dtos/FilterDto'
import type { INotionTableIntegration } from '@adapter/spi/integrations/NotionTableSpi'
import type { NotionTablePageProperties } from '@domain/integrations/NotionTable'
import { Client } from '@notionhq/client'
import type {
  CreatePageParameters,
  PageObjectResponse,
  DatabaseObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { NotionIntegration } from '.'
import { subSeconds, format } from 'date-fns'

export interface NotionTablePage {
  [key: string]: string | number | boolean
}

export class NotionTableIntegration implements INotionTableIntegration {
  constructor(
    private _notion: Client,
    private _database: DatabaseObjectResponse
  ) {}

  get name() {
    return this._database.title.map((title) => title.plain_text).join('')
  }

  create = async (page: NotionTablePageProperties) => {
    const properties = this._preprocessProperties(page)
    return NotionIntegration.retryIf502Error(async () => {
      const createdPage = await this._notion.pages.create({
        parent: {
          database_id: this._database.id,
        },
        properties,
      })
      return createdPage.id
    })
  }

  createMany = async (pages: NotionTablePageProperties[]) => {
    const ids: string[] = []
    for (const page of pages) {
      const id = await this.create(page)
      ids.push(id)
    }
    return ids
  }

  retrieve = async (id: string) => {
    return NotionIntegration.retryIf502Error(async () => {
      const page = await this._notion.pages.retrieve({ page_id: id })
      if (!('properties' in page)) {
        throw new Error('Page does not have properties')
      }
      const properties = this._postprocessProperties(page.properties)
      return {
        id: page.id,
        properties,
        createdTime: page.created_time,
      }
    })
  }

  archive = async (id: string) => {
    await NotionIntegration.retryIf502Error(async () => {
      await this._notion.pages.update({
        page_id: id,
        archived: true,
      })
    })
  }

  list = async (filter?: FilterDto) => {
    const query: QueryDatabaseParameters = {
      database_id: this._database.id,
    }
    if (filter) {
      query.filter = this._convertFilter(filter)
    }
    return NotionIntegration.retryIf502Error(async () => {
      const pages = await this._notion.databases.query(query)
      return pages.results.map((page) => {
        if (page.object !== 'page') {
          throw new Error('Not a page')
        }
        if (!('properties' in page)) {
          throw new Error('Page does not have properties')
        }
        const properties = this._postprocessProperties(page.properties)
        return {
          id: page.id,
          properties,
          createdTime: page.created_time,
        }
      })
    })
  }

  private _preprocessProperties = (
    page: NotionTablePageProperties
  ): CreatePageParameters['properties'] => {
    const properties: CreatePageParameters['properties'] = {}
    for (const key in page) {
      const property = this._database.properties[key]
      if (property) {
        switch (property.type) {
          case 'title':
            properties[key] = {
              type: 'title',
              title: [
                {
                  text: {
                    content: String(page[key]),
                  },
                },
              ],
            }
            break
        }
      }
    }
    return properties
  }

  private _postprocessProperties = (
    page: PageObjectResponse['properties']
  ): NotionTablePageProperties => {
    const properties: NotionTablePageProperties = {}
    for (const key in page) {
      const property = page[key]
      switch (property.type) {
        case 'title':
          properties[key] = property.title
            .map((title) => {
              if ('text' in title) {
                return title.text.content
              }
              return ''
            })
            .join('')
          break
      }
    }
    return properties
  }

  // TODO: fix two levels deep : https://developers.notion.com/reference/post-database-query-filter#compound-filter-conditions
  private _convertFilter = (filter: FilterDto): QueryDatabaseParameters['filter'] => {
    if ('and' in filter) {
      return {
        // eslint-disable-next-line
        // @ts-ignore
        and: filter.and.map(this._convertFilter),
      }
    } else if ('or' in filter) {
      return {
        // eslint-disable-next-line
        // @ts-ignore
        or: filter.or.map(this._convertFilter),
      }
    }
    const { operator, field } = filter
    const formatDate = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:00XXX")
    switch (operator) {
      case 'Is':
        return {
          property: field,
          rich_text: {
            equals: filter.value,
          },
        }
      case 'IsAfterNumberOfSecondsSinceNow':
        if (field === 'created_time') {
          return {
            timestamp: 'created_time',
            created_time: {
              on_or_after: formatDate(subSeconds(new Date(), filter.value)),
            },
          }
        }
        if (field === 'last_edited_time') {
          return {
            timestamp: 'last_edited_time',
            last_edited_time: {
              on_or_after: formatDate(subSeconds(new Date(), filter.value)),
            },
          }
        }
        return {
          property: field,
          date: {
            on_or_after: formatDate(subSeconds(new Date(), filter.value)),
          },
        }
      case 'Equals':
        return {
          property: field,
          number: {
            equals: filter.value,
          },
        }
      case 'IsAnyOf':
        return {
          or: filter.value.map((value) => ({
            property: field,
            multi_select: {
              contains: value,
            },
          })),
        }
      case 'IsFalse':
        return {
          property: field,
          checkbox: {
            equals: false,
          },
        }
      case 'IsTrue':
        return {
          property: field,
          checkbox: {
            equals: true,
          },
        }
    }
  }
}

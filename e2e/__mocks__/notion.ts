import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export const createPageResponse: PageObjectResponse = {
  object: 'page',
  id: '12345678-1234-1234-1234-123456789012',
  created_time: '2024-01-01T00:00:00.000Z',
  last_edited_time: '2024-01-01T00:00:00.000Z',
  created_by: {
    object: 'user',
    id: 'user-123',
  },
  last_edited_by: {
    object: 'user',
    id: 'user-123',
  },
  cover: null,
  icon: null,
  parent: {
    type: 'database_id',
    database_id: 'db-123',
  },
  archived: false,
  in_trash: false,
  is_locked: false,
  properties: {
    Name: {
      id: 'title',
      type: 'title',
      title: [
        {
          type: 'text',
          text: {
            content: 'Test Page',
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'Test Page',
          href: null,
        },
      ],
    },
  },
  url: 'https://www.notion.so/Test-Page-123456789012',
  public_url: null,
}

export const getPageResponse: PageObjectResponse = {
  ...createPageResponse,
  properties: {
    ...createPageResponse.properties,
    Status: {
      id: 'status',
      type: 'select',
      select: {
        id: 'status-1',
        name: 'In Progress',
        color: 'blue',
      },
    },
  },
}

export const updatePageResponse: PageObjectResponse = {
  ...createPageResponse,
  last_edited_time: '2024-01-02T00:00:00.000Z',
  properties: {
    ...createPageResponse.properties,
    Name: {
      id: 'title',
      type: 'title',
      title: [
        {
          type: 'text',
          text: {
            content: 'Updated Test Page',
            link: null,
          },
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: 'default',
          },
          plain_text: 'Updated Test Page',
          href: null,
        },
      ],
    },
  },
}

export const deletePageResponse: PageObjectResponse = {
  ...createPageResponse,
  archived: true,
  last_edited_time: '2024-01-03T00:00:00.000Z',
}

export const listPagesResponse = {
  object: 'list',
  results: [createPageResponse, getPageResponse],
  next_cursor: null,
  has_more: false,
  type: 'page_or_database',
  page_or_database: {},
}

export const searchPagesResponse = {
  object: 'list',
  results: [
    {
      ...createPageResponse,
      object: 'page',
    },
  ],
  next_cursor: null,
  has_more: false,
  type: 'page_or_database',
  page_or_database: {},
}

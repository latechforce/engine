import { test, expect, env } from '@tests/fixtures'
import { notion, integration } from '@tests/integrations/notion'

const { TEST_NOTION_TABLE_ID } = env

test.describe('Notion integration', () => {
  test('should create a page in a table with a title property', async () => {
    // GIVEN
    const table = await integration.table(TEST_NOTION_TABLE_ID)

    // WHEN
    const id = await table.create({
      Nom: 'My new page',
    })

    // THEN
    expect(id).toBeDefined()
  })

  test('should retrieve a page in a table', async () => {
    // GIVEN
    const table = await integration.table(TEST_NOTION_TABLE_ID)
    const id = await table.create({
      Nom: 'My new page',
    })

    // WHEN
    const page = await table.retrieve(id)

    // THEN
    expect(page.properties.Nom).toBe('My new page')
  })

  test('should archive a page in a table', async () => {
    // GIVEN
    const table = await integration.table(TEST_NOTION_TABLE_ID)
    const id = await table.create({
      Nom: 'My new page',
    })

    // WHEN
    await table.archive(id)

    // THEN
    const page = await notion.pages.retrieve({ page_id: id })
    if (!('archived' in page)) {
      throw new Error('Page properties are missing')
    }
    expect(page.archived).toBe(true)
  })
})

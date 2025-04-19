import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Mock } from '/test/bun'
import {
  notionTableSample1,
  notionTableSample2,
  notionUserSample,
} from '/infrastructure/integrations/bun/mocks/notion/NotionTestSamples'
import { configAutomationActionServiceCodeRunTypescriptWithNotionCreateIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/notion/create'
import { configAutomationActionServiceCodeRunTypescriptWithNotionUpdateIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/notion/update'
import { configAutomationActionServiceCodeRunTypescriptWithNotionReadIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/notion/read'
import { configAutomationActionServiceCodeRunTypescriptWithNotionArchiveIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/notion/archive'
import { configAutomationActionServiceCodeRunTypescriptWithNotionListIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/notion/list'
import { configAutomationActionServiceCodeRunTypescriptWithNotionReadPropertyIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/notion/readProperty'
import { configAutomationActionServiceCodeRunTypescriptWithNotionListAllUsersIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/notion/listAllUsers'

const mock = new Mock(Tester, { integrations: ['Notion'] })

mock.request(({ app, request, integrations }) => {
  beforeEach(async () => {
    await integrations.notion.addTableFromSchema(notionTableSample1)
    await integrations.notion.addTableFromSchema(notionTableSample2)
    await integrations.notion.addUser(notionUserSample)
  })

  describe('on POST', () => {
    it('should run a Typescript code with a Notion database page insert', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithNotionCreateIntegration
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/create-user`, {
        name: 'John',
      })

      // THEN
      const table = await integrations.notion.getTable(notionTableSample1.name)
      const user = await table.retrieve(response.user.id)
      expect(response.user.properties.name).toBe('John')
      expect(user.data?.properties.name).toBe('John')
    })

    it('should run a Typescript code with a Notion database page update', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithNotionUpdateIntegration
      )
      const table = await integrations.notion.getTable(notionTableSample1.name)
      const insertResponse = await table.insert({ name: 'John' })
      if (insertResponse.error) {
        throw new Error(insertResponse.error.message)
      }
      const { id } = insertResponse.data

      // WHEN
      const response = await request.post(`${url}/api/automation/update-user`, {
        id,
        name: 'John Doe',
      })

      // THEN
      const user = await table.retrieve(response.user.id)
      expect(response.user.properties.name).toBe('John Doe')
      expect(user.data?.properties.name).toBe('John Doe')
    })

    it('should run a Typescript code with a Notion database page retrieve', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithNotionReadIntegration
      )
      const table = await integrations.notion.getTable(notionTableSample1.name)
      const insertResponse = await table.insert({ name: 'John Doe' })
      if (insertResponse.error) {
        throw new Error(insertResponse.error.message)
      }
      const { id } = insertResponse.data

      // WHEN
      const response = await request.post(`${url}/api/automation/read-user`, {
        id,
      })

      // THEN
      expect(response.user.properties.name).toBe('John Doe')
    })

    it('should run a Typescript code with a Notion database page archive', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithNotionArchiveIntegration
      )
      const table = await integrations.notion.getTable(notionTableSample1.name)
      const insertResponse = await table.insert({ name: 'John Doe' })
      if (insertResponse.error) {
        throw new Error(insertResponse.error.message)
      }
      const { id } = insertResponse.data

      // WHEN
      const response = await request.post(`${url}/api/automation/read-user`, {
        id,
      })

      // THEN
      expect(response.user.archived).toBeTruthy()
    })

    it('should run a Typescript code with a Notion database page list', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithNotionListIntegration
      )
      const table = await integrations.notion.getTable(notionTableSample1.name)
      const users = await table.insertMany([
        { name: 'John Doe' },
        { name: 'John Wick' },
        { name: 'John Connor' },
      ])

      // WHEN
      const response = await request.post(`${url}/api/automation/list-users`, {
        ids: users.data?.map((user) => user.id),
      })

      // THEN
      expect(response.users).toHaveLength(3)
      const names = response.users.map(
        (user: { properties: { name: string } }) => user.properties.name
      )
      expect(names).toContain('John Doe')
      expect(names).toContain('John Wick')
      expect(names).toContain('John Connor')
    })

    it('should run a Typescript code with a Notion database page and a title property', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithNotionReadPropertyIntegration
      )
      const table = await integrations.notion.getTable(notionTableSample1.name)
      const insertResponse = await table.insert({ name: 'John Doe' })
      if (insertResponse.error) {
        throw new Error(insertResponse.error.message)
      }
      const { id } = insertResponse.data

      // WHEN
      const response = await request.post(`${url}/api/automation/read-property`, {
        id,
      })

      // THEN
      expect(response.property).toBe('John Doe')
    })

    it('should run a Typescript code with a Notion users list', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithNotionListAllUsersIntegration
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/list-users`)

      // THEN
      expect(response.users.length > 0).toBeTruthy()
    })
  })
})

import Tester, { expect, describe, it, beforeEach, afterEach, beforeAll, afterAll } from 'bun:test'
import { Mock } from '/test/bun'
import {
  airtableTableSample1,
  type AirtableTableSample1,
} from '/infrastructure/integrations/bun/mocks/airtable/AirtableTestSamples'
import { configAutomationActionServiceCodeRunTypescriptWithAirtableInsertIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/airtable/insert'
import { configAutomationActionServiceCodeRunTypescriptWithAirtableUpdateIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/airtable/update'
import { configAutomationActionServiceCodeRunTypescriptWithAirtableReadIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/airtable/read'
import { configAutomationActionServiceCodeRunTypescriptWithAirtableDeleteIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/airtable/delete'
import { configAutomationActionServiceCodeRunTypescriptWithAirtableListIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/airtable/list'
import { configAutomationActionServiceCodeRunTypescriptWithAirtableReadFieldIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/airtable/readField'

const mock = new Mock(Tester, { integrations: ['Airtable'] })

mock.request(({ app, request, integrations }) => {
  let airtableTableId: string

  beforeAll(async () => {
    airtableTableId = process.env.TEST_AIRTABLE_TABLE_1_ID!
  })

  afterAll(async () => {
    process.env.TEST_AIRTABLE_TABLE_1_ID = airtableTableId
  })

  beforeEach(async () => {
    await integrations.airtable.addTable<AirtableTableSample1>(
      airtableTableSample1.name,
      airtableTableSample1.fields
    )
    process.env.TEST_AIRTABLE_TABLE_1_ID = airtableTableSample1.name
  })

  describe('on POST', () => {
    it('should run a Typescript code with a Airtable database record insert', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithAirtableInsertIntegration
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/create-user`, {
        name: 'John',
      })

      // THEN
      const table = await integrations.airtable.getTable(airtableTableSample1.name)
      const user = await table.retrieve(response.user.id)
      expect(response.user.fields.name).toBe('John')
      expect(user.data?.fields.name).toBe('John')
    })

    it('should run a Typescript code with a Airtable database record update', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithAirtableUpdateIntegration
      )
      const table = await integrations.airtable.getTable(airtableTableSample1.name)
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
      expect(response.user.fields.name).toBe('John Doe')
      expect(user.data?.fields.name).toBe('John Doe')
    })

    it('should run a Typescript code with a Airtable database record retrieve', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithAirtableReadIntegration
      )
      const table = await integrations.airtable.getTable(airtableTableSample1.name)
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
      expect(response.user.fields.name).toBe('John Doe')
    })

    it('should run a Typescript code with a Airtable database record delete', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithAirtableDeleteIntegration
      )
      const table = await integrations.airtable.getTable(airtableTableSample1.name)
      const insertResponse = await table.insert({ name: 'John Doe' })
      if (insertResponse.error) {
        throw new Error(insertResponse.error.message)
      }
      const { id } = insertResponse.data

      // WHEN
      const response = await request.post(`${url}/api/automation/delete-user`, {
        id,
      })

      // THEN
      expect(response.user).toBeUndefined()
    })

    it('should run a Typescript code with a Airtable database record list', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithAirtableListIntegration
      )
      const table = await integrations.airtable.getTable(airtableTableSample1.name)
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
      const names = response.users.map((user: { fields: { name: string } }) => user.fields.name)
      expect(names).toContain('John Doe')
      expect(names).toContain('John Wick')
      expect(names).toContain('John Connor')
    })

    it('should run a Typescript code with a Airtable database record and a title field', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithAirtableReadFieldIntegration
      )
      const table = await integrations.airtable.getTable(airtableTableSample1.name)
      const insertResponse = await table.insert({ name: 'John Doe' })
      if (insertResponse.error) {
        throw new Error(insertResponse.error.message)
      }
      const { id } = insertResponse.data

      // WHEN
      const response = await request.post(`${url}/api/automation/read-field`, {
        id,
      })

      // THEN
      expect(response.field).toBe('John Doe')
    })
  })
})

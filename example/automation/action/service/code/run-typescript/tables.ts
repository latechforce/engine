import type { AppSchema, CodeContext } from '@/types'

export default {
  automations: [
    {
      id: 1,
      name: 'run-typescript',
      trigger: {
        service: 'http',
        event: 'post',
        path: 'run-typescript',
      },
      actions: [
        {
          service: 'code',
          action: 'run-typescript',
          name: 'runTypescriptCode',
          code: String(async function (context: CodeContext) {
            const contacts = context.table<{ name: string }>('Contacts')
            const record = await contacts.create({
              name: 'John Doe',
            })
            await contacts.createMany([
              {
                fields: {
                  name: 'Jane Doe',
                },
              },
            ])
            const updatedRecord = await contacts.update(record.id, {
              name: 'Jane Doe',
            })
            await contacts.updateMany([
              {
                id: updatedRecord.id,
                fields: {
                  name: 'John Doe',
                },
              },
            ])
            await contacts.read(updatedRecord.id)
            await contacts.delete(updatedRecord.id)
            const exists = await contacts.exists(record.id)
            await contacts.deleteMany([record.id, updatedRecord.id])
            const list = await contacts.list()
            return {
              record,
              updatedRecord,
              exists,
              list,
            }
          }),
        },
      ],
    },
  ],
  tables: [
    {
      id: 1,
      name: 'Contacts',
      fields: [
        {
          id: 1,
          name: 'name',
          type: 'single-line-text',
        },
      ],
    },
  ],
} satisfies AppSchema

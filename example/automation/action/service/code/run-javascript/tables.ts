import type { AppSchema } from '@/types'

export default {
  automations: [
    {
      id: 1,
      name: 'run-javascript',
      trigger: {
        service: 'http',
        event: 'post',
        postHttp: {
          path: 'run-javascript',
        },
      },
      actions: [
        {
          service: 'code',
          action: 'run-javascript',
          name: 'runJavascriptCode',
          runJavascriptCode: {
            // @ts-expect-error - CodeContext is not defined in JavaScript
            code: String(async function (context) {
              const contacts = context.table('Contacts')
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

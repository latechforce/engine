import type { AppSchema } from '@/types'
import calendlyConnection from '@/example/connection/calendly'
import type { Handlers } from '@/script/mock'
import { handlers as calendlyHandlers } from '../../../../connection/calendly'
import { getEventTypeResponse } from '@/e2e/__mocks__/calendly'

export const inGuides = false

export default {
  name: 'Get Calendly event type',
  description: 'Automation with a Calendly get event type action',
  automations: [
    {
      id: 1,
      name: 'get-event-type',
      trigger: {
        service: 'http',
        event: 'post',
        params: {
          path: '/get-event-type',
        },
      },
      actions: [
        {
          name: 'get-event-type',
          account: 'Calendly',
          service: 'calendly',
          action: 'get-event-type',
          params: {
            uuid: 'AAAAAAAAAAAAAAAA',
          },
        },
      ],
    },
  ],
  connections: calendlyConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...calendlyHandlers,
  'https://api.calendly.com/event_types/AAAAAAAAAAAAAAAA': {
    GET: async () => ({
      json: getEventTypeResponse,
    }),
  },
}

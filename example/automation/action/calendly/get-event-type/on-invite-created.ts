import type { AppSchema } from '@/types'
import calendlyConnection from '@/example/connection/calendly'
import type { Handlers } from '@/script/mock'
import { handlers as calendlyHandlers } from '../../../../connection/calendly'
import { getEventTypeResponse } from '@/e2e/__mocks__/calendly'

export const inGuides = false

export default {
  name: 'Get Calendly event type on invite created',
  description: 'Automation with a Calendly get event type action on invite created',
  automations: [
    {
      id: 1,
      name: 'get-event-type',
      trigger: {
        service: 'calendly',
        event: 'invite-created',
        account: 'Calendly',
      },
      actions: [
        {
          name: 'get-event-type',
          account: 'Calendly',
          service: 'calendly',
          action: 'get-event-type',
          params: {
            uuid: '{{regex trigger.payload.scheduled_event.event_type "event_types/([^/?]+)"}}',
          },
        },
      ],
    },
  ],
  connections: calendlyConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...calendlyHandlers,
  'https://api.calendly.com/event_types/GBGBDCAADAEDCRZ2': {
    GET: async () => ({
      json: getEventTypeResponse,
    }),
  },
}

import type { AppSchema, Mock } from '@/types'
import youcanbookmeConnection, { mock as youcanbookmeMock } from '@/example/connection/youcanbookme'

export const inGuides = false

export const mock: Mock = {
  ...youcanbookmeMock,
}

export default {
  name: 'Trigger an automation with a YouCanBookMe booking notifications event',
  description: 'Automation with YouCanBookMe booking notifications trigger',
  automations: [
    {
      name: 'youcanbookme',
      trigger: {
        service: 'youcanbookme',
        event: 'booking-notifications',
        path: '/youcanbookme-booking-notifications',
        account: 'YouCanBookMe',
      },
      actions: [],
    },
  ],
  connections: youcanbookmeConnection.connections,
} satisfies AppSchema

import type { AppSchema } from '@/types'
import facebookConnection from '@/example/connection/facebook/ads'
import type { Handlers } from '@/script/mock'
import { handlers as facebookHandlers } from '../../../../../connection/facebook'

export const inGuides = false

export default {
  name: 'Get Facebook LeadGen',
  description: 'Automation that gets a single Facebook LeadGen by ID',
  automations: [
    {
      id: 1,
      name: 'get-leadgen',
      trigger: {
        service: 'http',
        event: 'get',
        params: {
          path: '/get-leadgen',
        },
      },
      actions: [
        {
          name: 'get-leadgen',
          service: 'facebook-ads',
          action: 'get-leadgen',
          account: 'Facebook Ads',
          params: {
            leadgenId: '444444444444',
          },
        },
      ],
    },
  ],
  connections: facebookConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...facebookHandlers,
  'https://graph.facebook.com/v23.0/444444444444': {
    GET: async () => ({
      json: {
        id: '444444444444',
        ad_id: '444444444',
        form_id: '444444444444',
        field_data: [
          {
            name: 'email',
            values: ['john.doe@example.com'],
          },
          {
            name: 'first_name',
            values: ['John'],
          },
          {
            name: 'last_name',
            values: ['Doe'],
          },
          {
            name: 'company',
            values: ['Example Corp'],
          },
          {
            name: 'phone_number',
            values: ['+1234567890'],
          },
        ],
        created_time: '2025-09-10T10:00:00Z',
        page_id: '444444444444',
        adgroup_id: '44444444444',
        campaign_id: '555555555',
        is_organic: false,
        platform: 'facebook',
      },
    }),
  },
}

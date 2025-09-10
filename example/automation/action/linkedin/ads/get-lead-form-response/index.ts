import type { AppSchema } from '@/types'
import linkedinConnection from '@/example/connection/linkedin/ads'
import type { Handlers } from '@/script/mock'
import { handlers as linkedinHandlers } from '../../../../../connection/linkedin'

export const inGuides = false

export default {
  name: 'Get LinkedIn Lead Form Response',
  description: 'Automation that gets a single LinkedIn Lead Form Response by ID',
  automations: [
    {
      id: 1,
      name: 'get-lead-response',
      trigger: {
        service: 'http',
        event: 'get',
        params: {
          path: '/get-lead-response',
        },
      },
      actions: [
        {
          name: 'get-lead-form-response',
          service: 'linkedin-ads',
          action: 'get-lead-form-response',
          account: 'LinkedIn Ads',
          params: {
            leadResponseId: '123456',
          },
        },
      ],
    },
  ],
  connections: linkedinConnection.connections,
} satisfies AppSchema

export const handlers: Handlers = {
  ...linkedinHandlers,
  'https://api.linkedin.com/rest/leadFormResponses/123456': {
    GET: async () => ({
      json: {
        id: '123456',
        owner: {
          organization: 'urn:li:organization:5622087',
        },
        submitter: {
          person: 'urn:li:person:abc123',
        },
        formResponse: {
          id: 'urn:li:leadFormResponse:123456',
          formId: 'urn:li:leadForm:789',
          submittedAt: 1609459200000,
          answers: [
            {
              questionId: 'firstName',
              answer: 'John',
            },
            {
              questionId: 'lastName',
              answer: 'Doe',
            },
            {
              questionId: 'email',
              answer: 'john.doe@example.com',
            },
            {
              questionId: 'company',
              answer: 'Example Corp',
            },
          ],
        },
        submittedAt: 1609459200000,
        leadType: 'SPONSORED',
      },
    }),
  },
}

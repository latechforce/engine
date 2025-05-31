import { z } from 'zod/v4'
import { baseIntegrationTriggerSchema } from '../base'

export const baseYoucanbookmeTriggerSchema = baseIntegrationTriggerSchema.extend({
  service: z.literal('youcanbookme'),
})

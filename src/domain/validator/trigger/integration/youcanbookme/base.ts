import { z } from 'zod/v4'
import { baseIntegrationTriggerValidator } from '../base'

export const baseYoucanbookmeTriggerValidator = baseIntegrationTriggerValidator.extend({
  service: z.literal('youcanbookme'),
})

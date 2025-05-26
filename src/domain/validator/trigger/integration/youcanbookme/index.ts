import { z } from 'zod/v4'
import { bookingNotificationsYoucanbookmeTriggerValidator } from './booking-notifications.validator'

export const youcanbookmeTriggerValidator = z
  .union([bookingNotificationsYoucanbookmeTriggerValidator])
  .meta({
    title: 'YouCanBookMe',
    description: 'The YouCanBookMe trigger is a trigger that is triggered by a YouCanBookMe event',
  })

export type YouCanBookMeTriggerSchema = z.infer<typeof youcanbookmeTriggerValidator>

import { z } from 'zod/v4'
import { bookingNotificationsYoucanbookmeTriggerSchema } from './booking-notifications.schema'

export const youcanbookmeTriggerSchema = z
  .union([bookingNotificationsYoucanbookmeTriggerSchema])
  .meta({
    title: 'YouCanBookMe',
    description: 'The YouCanBookMe trigger is a trigger that is triggered by a YouCanBookMe event',
  })

export type YouCanBookMeTriggerSchema = z.infer<typeof youcanbookmeTriggerSchema>

import { z } from 'zod/v4'
import { baseYoucanbookmeTriggerSchema } from './base'

export const bookingNotificationsYoucanbookmeTriggerSchema = baseYoucanbookmeTriggerSchema
  .extend({
    event: z.literal('booking-notifications'),
    path: z.string(),
  })
  .meta({
    title: 'Booking Notifications',
    description:
      'The YouCanBookMe booking notifications trigger is a trigger that is triggered by a booking notifications event',
  })

export type BookingNotificationsYoucanbookmeTriggerSchema = z.infer<
  typeof bookingNotificationsYoucanbookmeTriggerSchema
>

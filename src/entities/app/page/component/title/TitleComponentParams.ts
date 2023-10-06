import * as t from 'io-ts'
import { BaseComponentParams } from '../base/BaseComponentParams'
import { UIStyle } from '@entities/services/ui/UIStyle'

export const TitleSize = t.union([
  t.literal('extra-small'),
  t.literal('small'),
  t.literal('medium'),
  t.literal('large'),
  t.literal('extra-large'),
])

export type TitleSize = t.TypeOf<typeof TitleSize>

export const TitleComponentParams = t.intersection([
  BaseComponentParams,
  t.type({
    type: t.literal('title'),
    text: t.string,
  }),
  t.partial({
    size: TitleSize,
    style: t.partial({
      title: UIStyle,
    }),
  }),
])

export type TitleComponentParams = t.TypeOf<typeof TitleComponentParams>

import { z } from 'zod/v4'
import { optionsInputValidator } from './options'
import { baseInputValidator } from './base'

export const inputValidator = z.union([baseInputValidator, optionsInputValidator]).meta({
  title: 'Input',
  description: 'The input is a input of a form',
})

export type InputSchema = z.infer<typeof inputValidator>

import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './Input'

const meta = {
  title: 'Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    field: 'name',
    type: 'text',
    label: 'Name',
    description: 'This is a description',
    placeholder: 'Enter your name',
    required: true,
  },
}

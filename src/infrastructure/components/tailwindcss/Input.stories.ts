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
  },
}

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Name',
  },
}

export const WithDescription: Story = {
  args: {
    ...WithLabel.args,
    description: 'This is a description',
  },
}

export const WithPlaceholder: Story = {
  args: {
    ...WithDescription.args,
    placeholder: 'Enter your name',
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import { Form } from './Form'
import { Input } from './Input'

const meta = {
  title: 'Form/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Form',
    description: 'This is a form',
    action: '/',
    submitLabel: 'Submit',
    children: [
      <Input
        field="name"
        type="text"
        label="Name"
        description="This is a description"
        placeholder="Enter your name"
        required={true}
      />,
    ],
  },
}

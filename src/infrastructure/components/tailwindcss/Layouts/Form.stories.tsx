import type { Meta, StoryObj } from '@storybook/react'
import { Form } from './Form'
import { Input } from '../BasicForms/Input'
import { AdvancedSelect } from '../AdvancedForms/AdvancedSelect'
import { FileInput } from '../BasicForms/FileInput'
import { Checkbox } from '../BasicForms/Checkbox'
import { Textarea } from '../BasicForms/Textarea'

const meta = {
  title: 'Form/Form',
  component: Form,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'form',
    title: 'Form',
    description: 'This is a form',
    submitLabel: 'Submit',
    children: [
      <Input field="name" label="Name" placeholder="Enter your name" type="text" />,
      <Input field="email" label="Email" placeholder="Enter your email" type="email" />,
      <Textarea field="description" label="Description" placeholder="Enter your description" />,
      <AdvancedSelect field="status" label="Status" options={['Active', 'Inactive']} />,
      <Checkbox field="isActive" label="Is Active" />,
      <FileInput field="attachments" label="Attachments" />,
    ],
  },
}

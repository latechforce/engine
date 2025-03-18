import type { Meta, StoryObj } from '@storybook/react'
import { Form } from './Form'
import { SingleLineTextInput } from './Input/SingleLineTextInput'
import { SingleSelectInput } from './Input/SingleSelectInput'
import { MultipleAttachmentInput } from './Input/MultipleAttachmentInput'
import { CheckboxInput } from './Input/CheckboxInput'

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
      <SingleLineTextInput field="name" label="Name" />,
      <SingleSelectInput field="status" label="Status" options={['Active', 'Inactive']} />,
      <CheckboxInput field="isActive" label="Is Active" />,
      <MultipleAttachmentInput field="attachments" label="Attachments" />,
    ],
  },
}

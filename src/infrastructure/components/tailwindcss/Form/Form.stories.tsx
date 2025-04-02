import type { Meta, StoryObj } from '@storybook/react'
import { Form } from './Form'
import { TextInput } from './Input/TextInput'
import { SelectInput } from './Input/SelectInput'
import { FileInput } from './Input/FileInput'
import { CheckboxInput } from './Input/CheckboxInput'
import { TextareaInput } from './Input/TextareaInput'

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
      <TextInput field="name" label="Name" placeholder="Enter your name" type="text" />,
      <TextInput field="email" label="Email" placeholder="Enter your email" type="email" />,
      <TextareaInput
        field="description"
        label="Description"
        placeholder="Enter your description"
      />,
      <SelectInput field="status" label="Status" options={['Active', 'Inactive']} />,
      <CheckboxInput field="isActive" label="Is Active" />,
      <FileInput field="attachments" label="Attachments" />,
    ],
  },
}

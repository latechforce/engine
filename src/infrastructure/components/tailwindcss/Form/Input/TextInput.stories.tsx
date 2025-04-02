import type { Meta, StoryObj } from '@storybook/react'

import { TextInput } from './TextInput'
import { Form } from '../Form'
import type { TextInputProps } from '/domain/components/Form/Input/TextInput'

const TextInputWithForm = (props: TextInputProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <TextInput {...props} />
  </Form>
)

const meta = {
  title: 'Form/TextInput',
  component: TextInputWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TextInputWithForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'text',
    field: 'single_line_text',
    label: 'Single Line Text',
    description: 'This is a description',
    placeholder: 'Enter your text',
  },
}

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
  },
}

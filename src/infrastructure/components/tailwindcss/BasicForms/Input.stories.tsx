import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './Input'
import { Form } from '../Layouts/Form'
import type { InputProps } from '/domain/components/BasicForms/Input'

const InputWithForm = (props: InputProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <Input {...props} />
  </Form>
)

const meta = {
  title: 'Form/Input',
  component: InputWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof InputWithForm>

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

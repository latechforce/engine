import type { Meta, StoryObj } from '@storybook/react'

import { EmailInput } from './EmailInput'
import { Form } from '../Form'
import type { EmailInputProps } from '/domain/components/Form/Input/EmailInput'

const EmailInputWithForm = (props: EmailInputProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <EmailInput {...props} />
  </Form>
)

const meta = {
  title: 'Form/EmailInput',
  component: EmailInputWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof EmailInputWithForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
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

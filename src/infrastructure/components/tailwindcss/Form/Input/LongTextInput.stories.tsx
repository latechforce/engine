import type { Meta, StoryObj } from '@storybook/react'

import { LongTextInput } from './LongTextInput'
import { Form } from '../Form'
import type { LongTextInputProps } from '/domain/components/Form/Input/LongTextInput'

const LongTextInputWithForm = (props: LongTextInputProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <LongTextInput {...props} />
  </Form>
)

const meta = {
  title: 'Form/LongTextInput',
  component: LongTextInputWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LongTextInputWithForm>

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

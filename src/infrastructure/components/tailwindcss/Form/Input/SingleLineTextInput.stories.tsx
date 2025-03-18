import type { Meta, StoryObj } from '@storybook/react'

import { SingleLineTextInput } from './SingleLineTextInput'
import { Form } from '../../Form/Form'
import type { SingleLineTextInputProps } from '/domain/components/Form/Input/SingleLineTextInput'

const SingleLineTextInputWithForm = (props: SingleLineTextInputProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <SingleLineTextInput {...props} />
  </Form>
)

const meta = {
  title: 'Form/SingleLineTextInput',
  component: SingleLineTextInputWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SingleLineTextInputWithForm>

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

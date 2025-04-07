import type { Meta, StoryObj } from '@storybook/react'

import { TextareaInput } from './TextareaInput'
import { Form } from '../Form'
import type { TextareaInputProps } from '/domain/components/Form/Input/TextareaInput'

const TextareaInputWithForm = (props: TextareaInputProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <TextareaInput {...props} />
  </Form>
)

const meta = {
  title: 'Form/TextareaInput',
  component: TextareaInputWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TextareaInputWithForm>

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

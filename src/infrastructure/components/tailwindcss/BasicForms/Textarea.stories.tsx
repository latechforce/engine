import type { Meta, StoryObj } from '@storybook/react'

import { Textarea } from './Textarea'
import { Form } from '../Layouts/Form'
import type { TextareaProps } from '/domain/components/BasicForms/Textarea'

const TextareaWithForm = (props: TextareaProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <Textarea {...props} />
  </Form>
)

const meta = {
  title: 'Form/Textarea',
  component: TextareaWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TextareaWithForm>

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

import type { Meta, StoryObj } from '@storybook/react'

import { MultipleAttachmentInput } from './MultipleAttachmentInput'
import { Form } from '../Form'
import type { MultipleAttachmentInputProps } from '/domain/components/Form/Input/MultipleAttachmentInput'

const MultipleAttachmentInputWithForm = (props: MultipleAttachmentInputProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <MultipleAttachmentInput {...props} />
  </Form>
)

const meta = {
  title: 'Form/MultipleAttachmentInput',
  component: MultipleAttachmentInputWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MultipleAttachmentInputWithForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    field: 'multiple_attachment',
    label: 'Multiple Attachment',
    description: 'This is a description',
    placeholder: 'Select files',
  },
}

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
  },
}

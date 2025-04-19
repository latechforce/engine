import type { Meta, StoryObj } from '@storybook/react'

import { FileInput } from './FileInput'
import { Form } from '../Layouts/Form'
import type { FileInputProps } from '../../../../domain/components/BasicForms/FileInput'

const FileInputWithForm = (props: FileInputProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <FileInput {...props} />
  </Form>
)

const meta = {
  title: 'Form/FileInput',
  component: FileInputWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FileInputWithForm>

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

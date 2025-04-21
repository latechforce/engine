import type { Meta, StoryObj } from '@storybook/react'

import { Search } from './Search'
import { Form } from '../Layouts/Form'
import type { SearchProps } from '/domain/components/BasicForms/Search'

const SearchWithForm = (props: SearchProps) => (
  <Form id="id" title="Form" submitLabel="Save">
    <Search {...props} />
  </Form>
)

const meta = {
  title: 'Form/Search',
  component: SearchWithForm,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchWithForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    field: 'single_line_text',
    label: '',
    description: '',
    placeholder: 'Search',
  },
}

export const Required: Story = {
  args: {
    ...Default.args,
    label: 'Search',
    placeholder: '',
    required: true,
  },
}

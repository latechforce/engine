import type { Meta, StoryObj } from '@storybook/react'

import { TableSearch } from './TableSearch'

const meta = {
  title: 'Form/TableSearch',
  component: TableSearch,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TableSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    field: 'single_line_text',
    placeholder: 'Search',
  },
}

export const Required: Story = {
  args: {
    ...Default.args,
    label: 'Search',
    placeholder: '',
  },
}

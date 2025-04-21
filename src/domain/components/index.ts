export * from './BasicForms/Checkbox'
export * from './BasicForms/FileInput'
export * from './BasicForms/Input'
export * from './BasicForms/Textarea'
export * from './Layouts/Form'
export * from './Layouts/FormResponse'
export * from './Layouts/Page'
export * from './AdvancedForms/AdvancedSelect'
export * from './Navigations/Sidebar'
export * from './Tables/Table'
export * from './Overlays/Dropdown'
import type { Checkbox } from './BasicForms/Checkbox'
import type { Form } from './Layouts/Form'
import type { FormResponse } from './Layouts/FormResponse'
import type { Input } from './BasicForms/Input'
import type { AdvancedSelect } from './AdvancedForms/AdvancedSelect'
import type { Page } from './Layouts/Page'
import type { FileInput } from './BasicForms/FileInput'
import type { Textarea } from './BasicForms/Textarea'
import type { Sidebar } from './Navigations/Sidebar'
import type { Table } from './Tables/Table'
import type { Dropdown } from './Overlays/Dropdown'
import type { H1 } from './Typography/H1'
import type { H2 } from './Typography/H2'
import type { H3 } from './Typography/H3'
import type { Search } from './BasicForms/Search'

export type Components = {
  Page: Page
  Form: Form
  FormResponse: FormResponse
  Input: Input
  Textarea: Textarea
  AdvancedSelect: AdvancedSelect
  Checkbox: Checkbox
  FileInput: FileInput
  Sidebar: Sidebar
  Table: Table
  Dropdown: Dropdown
  H1: H1
  H2: H2
  H3: H3
  Search: Search
}

import type { Components } from '/domain/components'
import { Page } from './Layouts/Page'
import { Form } from './Layouts/Form'
import { Input } from './BasicForms/Input'
import { FormResponse } from './Layouts/FormResponse'
import { Checkbox } from './BasicForms/Checkbox'
import { AdvancedSelect } from './AdvancedForms/AdvancedSelect'
import { FileInput } from './BasicForms/FileInput'
import { Textarea } from './BasicForms/Textarea'
import { Sidebar } from './Navigations/Sidebar'
import { Table } from './Tables/Table'
import { Dropdown } from './Overlays/Dropdown'

export const components: Components = {
  Page,
  Form,
  FormResponse,
  Input,
  Textarea,
  AdvancedSelect,
  Checkbox,
  FileInput,
  Sidebar,
  Table,
  Dropdown,
}

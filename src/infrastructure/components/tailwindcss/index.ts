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
import { H1 } from './Typography/H1/H1'
import { H2 } from './Typography/H2/H2'
import { H3 } from './Typography/H3/H3'
import { Search } from './BasicForms/Search'

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
  H1,
  H2,
  H3,
  Search,
}

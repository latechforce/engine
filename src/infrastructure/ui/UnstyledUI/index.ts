import { IUISpi } from '@domain/spi/IUISpi'
import LinkUnstyledUI from './LinkUnstyledUI'
import ParagraphUnstyledUI from './ParagraphUnstyledUI'
import TitleUnstyledUI from './TitleUnstyledUI'
import NavigationUnstyledUI from './NavigationUnstyledUI'
import ListUnstyledUI from './ListUnstyledUI'
import FormUnstyledUI from './FormUnstyledUI'
import TableInputUnstyledUI from './TableInputUnstyledUI'
import TextInputUnstyledUI from './TextInputUnstyledUI'
import SingleSelectRecordInputUnstyledUI from './SingleSelectRecordInputUnstyledUI'
import SingleSelectInputUnstyledUI from './SingleSelectInputUnstyledUI'

const UnstyledUI: IUISpi = {
  name: 'UnstyledUI',
  LinkUI: LinkUnstyledUI,
  ParagraphUI: ParagraphUnstyledUI,
  TitleUI: TitleUnstyledUI,
  NavigationUI: NavigationUnstyledUI,
  ListUI: ListUnstyledUI,
  FormUI: FormUnstyledUI,
  TextInputUI: TextInputUnstyledUI,
  TableInputUI: TableInputUnstyledUI,
  SingleSelectRecordInputUI: SingleSelectRecordInputUnstyledUI,
  SingleSelectInputUI: SingleSelectInputUnstyledUI,
}

export default UnstyledUI
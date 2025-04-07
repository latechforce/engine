import type { CheckboxInput, CheckboxInputProps } from './CheckboxInput'
import type { FileInput, FileInputProps } from './FileInput'
import type { TextInput, TextInputProps } from './TextInput'
import type { SelectInput, SelectInputProps } from './SelectInput'
import type { TextareaInput, TextareaInputProps } from './TextareaInput'

export type Input = TextInput | CheckboxInput | SelectInput | FileInput | TextareaInput

export type { TextInput, CheckboxInput, SelectInput, FileInput, TextareaInput }

export type {
  CheckboxInputProps,
  FileInputProps,
  SelectInputProps,
  TextareaInputProps,
  TextInputProps,
}

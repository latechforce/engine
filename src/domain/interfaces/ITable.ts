import type { IField } from './IField'

export interface ITable {
  name: string
  schema?: string
  fields: IField[]
}

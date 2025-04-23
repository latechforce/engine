import type { BaseProps } from './Base'

export type SearchProps = BaseProps & {
  placeholder?: string
  searchRoute?: string
  resultsContainer?: string
  value?: string
}

export type Search = React.ComponentType<SearchProps>

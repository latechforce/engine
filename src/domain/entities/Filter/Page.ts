/**
 * Configuration object for defining pagination parameters.
 * This is typically used as input or DTO for controlling the number
 * and starting point of results returned from a query.
 */
export type PageConfig = {
  page: number

  perPage?: number
}

export const DEFAULT_PER_PAGE = 10

export const DEFAULT_PAGE = 1

export const DEFAULT_PAGE_CONFIG: PageConfig = {
  page: DEFAULT_PAGE,
  perPage: DEFAULT_PER_PAGE,
}

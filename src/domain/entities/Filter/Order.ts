/**
 * Represents the direction of sorting.
 */
export type OrderDirection = 'asc' | 'desc'

/**
 * Configuration object for defining an order clause.
 * This is typically used as input or DTO.
 */
export type OrderConfig = {
  /**
   * The name of the field to sort by.
   */
  field: string

  /**
   * The direction of the sort (ascending or descending).
   * Defaults to 'asc' if not provided.
   */
  direction?: OrderDirection
}

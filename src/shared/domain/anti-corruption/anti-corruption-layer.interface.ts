/**
 * Anti-corruption layer interface for protecting domain integrity
 * from external service data formats and changes
 */
export interface IAntiCorruptionLayer<TExternal, TDomain> {
  /**
   * Transform external API response to domain object
   */
  toDomain(external: TExternal): TDomain

  /**
   * Transform domain object to external API format
   */
  toExternal(domain: TDomain): TExternal

  /**
   * Validate external data structure
   */
  validateExternal(data: unknown): data is TExternal

  /**
   * Get the name/version of the external service for logging
   */
  getServiceInfo(): { name: string; version: string }
}

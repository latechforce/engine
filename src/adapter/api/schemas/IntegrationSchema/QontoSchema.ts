import type { QontoConfig } from '/domain/integrations/Qonto'

/**
 * Qonto configuration schema
 * @title Qonto
 * @description A configuration schema for Qonto banking integration
 * @example
 * {
 *   name: "business-account",
 *   organisationSlug: "my-company",
 *   secretKey: "1234567890ABCD",
 *   stagingToken: "staging_1234567890ABCD"
 * }
 */
export type QontoIntegrationSchema = QontoConfig

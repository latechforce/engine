import type { GoCardlessConfig } from '/domain/integrations/GoCardless'

/**
 * GoCardless configuration schema
 * @title GoCardless
 * @description A configuration schema for GoCardless payment integration
 * @example
 * {
 *   name: "payment-processing",
 *   accessToken: "live_1234567890ABCD"
 * }
 */
export type GoCardlessIntegrationSchema = GoCardlessConfig

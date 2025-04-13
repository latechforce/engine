import type { CalendlyConfig } from '/domain/integrations/Calendly'

/**
 * Calendly configuration schema
 * @title Calendly
 * @description A configuration schema for Calendly scheduling integration
 * @example
 * {
 *   name: "scheduling",
 *   user: {
 *     accessToken: "1234567890ABCD"
 *   }
 * }
 */
export type CalendlyIntegrationSchema = CalendlyConfig

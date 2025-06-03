import type { RouteConfig } from '@hono/zod-openapi'

export type IAutomationRepository = {
  info(message: string): void
  error(message: string): void
  debug(message: string): void
  addOpenAPIRoute(routeConfig: RouteConfig): void
}

import type { Hono } from 'hono'
import type { HonoType } from '../service/server.service'
import { createAllServices, type AllServices } from './factory'

export async function registerDependencies(
  externals: Record<string, unknown> = {},
  apiRoutes: Hono<HonoType>
): Promise<AllServices> {
  return await createAllServices(externals, apiRoutes)
}
